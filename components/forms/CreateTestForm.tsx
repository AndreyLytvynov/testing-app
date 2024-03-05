"use client";
import { ChangeEvent, FormEventHandler, KeyboardEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FaSave } from "react-icons/fa";

import { MdOutlineAddAPhoto } from "react-icons/md";

import { createTest } from "@/lib/actions/testing.actions";

import AddedQuestionsList from "@/components/AddedQuestionsList";
import WhiteContainer from "../shared/WhiteContainer";
import Input from "../shared/Input";
import Button from "../shared/buttons/Button";

import { Question } from "@/types/test";

const CreateTestForm = () => {
  const router = useRouter();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [testName, setTestName] = useState<string>("");
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [image, setImage] = useState<string>("");

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    if (testName === "") setTestName(formData.get("name") as string);

    const sortedAnswer = [
      formData.get("correctAnswer"),
      formData.get("answer2"),
      formData.get("answer3"),
      formData.get("answer4"),
    ].sort(() => 0.5 - Math.random());

    const questionObj: Question = {
      question: formData.get("question") as string,
      answer: sortedAnswer as string[],
      correctAnswer: formData.get("correctAnswer") as string,
      docs: formData.get("docs") as string,
    };

    if (image) {
      formData.append("upload_preset", "ml_default");
      formData.append("folder", "custom_folder");
      formData.append(
        "api_key",
        process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string
      );
      formData.append("public_id", `${Date.now()}`);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();

      questionObj["image"] = {
        publicId: result.public_id,
        url: result.secure_url,
      };
    }

    setQuestions((prev) => [...prev, questionObj as Question]);
    setQuestionNumber(questionNumber + 1);

    (e.target as HTMLFormElement).reset();
    setImage("");
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleCompleteTest = async () => {
    const test = {
      name: testName,
      questions,
    };

    await createTest(test);
    router.push("/tests");
  };

  const handleDeleteQuestion = (questionText: string) => {
    const newQuestions = questions.filter(({ question }) => {
      return question !== questionText;
    });
    setQuestions(newQuestions);
    setQuestionNumber(questionNumber - 1);
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <WhiteContainer>
        <form
          className={"flex flex-col items-center w-full p-3"}
          onSubmit={onSubmit}
        >
          <div className='border-b border-grey-2 gap-2 pb-4 w-full flex justify-between items-center mb-3'>
            {testName ? (
              <p
                onClick={() => {
                  setTestName("");
                }}
                className='text-xl p-3 text-violet font-bold'
              >
                {testName}
              </p>
            ) : (
              <div>
                <label className='text-violet self-start' htmlFor='name'>
                  <p className='text-xs'>Test name</p>
                </label>
                <Input
                  type={"text"}
                  placeholder={"test name*"}
                  name={"name"}
                  onKeyDown={handleKeyPress}
                  required={true}
                  id={"name"}
                />
              </div>
            )}

            <Button
              className='border-none ml-auto'
              onClick={handleCompleteTest}
              disabled={questions.length === 0}
            >
              <div
                className={`gap-2 ${
                  questions.length === 0
                    ? "text-light-3"
                    : "text-violet hover:text-white"
                }  flex items-center justify-between`}
              >
                <FaSave className='text-lg' />
                <p className='text-lg font-semibold'>Save test</p>
              </div>
            </Button>
          </div>
          <div className='flex justify-between gap-4 w-full'>
            <div className='relative self-start mb-2'>
              <input
                className='cursor-pointer w-[300px] h-[300px] opacity-0'
                type='file'
                name='file'
                onChange={handleFileChange}
              />
              {image ? (
                <img
                  src={image}
                  className='rounded-lg pointer-events-none object-cover w-[300px] h-[300px] absolute top-0 left-0'
                  alt='photo question'
                  width={100}
                  height={100}
                />
              ) : (
                <div className='pointer-events-none absolute top-0 left-0 flex flex-col items-center justify-center w-[300px] h-[300px] border border-dashed border-light-3 text-light-3 rounded-lg cursor-pointer'>
                  <MdOutlineAddAPhoto className='w-14 h-14' />
                  <p>add photo</p>
                </div>
              )}
            </div>

            <div className='flex flex-col w-full h-[300px] mb-4 gap-4'>
              <textarea
                id='question'
                className={
                  "flex-1 custom-scrollbar text-violet font-medium text-base resize-none w-full p-2 rounded border border-grey-2 caret-grey-2 outline-violet"
                }
                name='question'
                required
                placeholder='text question*'
              />
              <input
                type='text'
                className={
                  "h-10 custom-scrollbar text-violet font-medium text-base resize-none w-full p-2 rounded border border-grey-2 caret-grey-2 outline-violet"
                }
                name={"docs"}
                placeholder='docs link'
                onKeyDown={handleKeyPress}
              />
            </div>
          </div>

          <div className='flex flex-wrap gap-5 w-full'>
            <Input
              type={"text"}
              placeholder={"correct answer*"}
              name={"correctAnswer"}
              onKeyDown={handleKeyPress}
              className='placeholder:text-green-500 w-[calc(50%-10px)]'
              required={true}
            />
            <Input
              type={"text"}
              placeholder={"answer*"}
              name={"answer2"}
              onKeyDown={handleKeyPress}
              className='w-[calc(50%-10px)]'
            />
            <Input
              type={"text"}
              placeholder={"answer"}
              name={"answer3"}
              onKeyDown={handleKeyPress}
              className='w-[calc(50%-10px)]'
            />
            <Input
              type={"text"}
              placeholder={"answer"}
              name={"answer4"}
              onKeyDown={handleKeyPress}
              className='w-[calc(50%-10px)]'
            />
          </div>
          <Button className='mt-4' type={"submit"}>
            Add question
          </Button>
        </form>
      </WhiteContainer>
      {questions.length !== 0 && (
        <WhiteContainer className='mt-5'>
          <AddedQuestionsList
            questions={questions}
            onDeleteQuestion={handleDeleteQuestion}
          />
        </WhiteContainer>
      )}
    </>
  );
};

export default CreateTestForm;
