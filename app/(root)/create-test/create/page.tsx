"use client";
import AddedQuestionsList from "@/components/shared/addedQuestionsList";
import { FormEventHandler, KeyboardEvent, useState } from "react";

export type Question = {
  question: string;
  answer: string[];
  correctAnswer: string;
};

const Create = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [testName, setTestName] = useState<string>("");
  const [questionNumber, setQuestionNumber] = useState<number>(1);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    if (testName === "") setTestName(formData.get("name") as string);

    const questionObj = {
      question: formData.get("question"),
      answer: [
        formData.get("correctAnswer"),
        formData.get("answer2"),
        formData.get("answer3"),
        formData.get("answer4"),
      ],
      correctAnswer: formData.get("correctAnswer"),
    };

    setQuestions((prev) => [...prev, questionObj as Question]);
    setQuestionNumber(questionNumber + 1);

    (e.target as HTMLFormElement).reset();
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleCompleteTest = () => {
    const test = {
      name: testName,
      questions,
    };
    console.log(test);
  };

  const handleDeleteQuestion = (questionText: string) => {
    const newQuestions = questions.filter(({ question }) => {
      return question !== questionText;
    });
    setQuestions(newQuestions);
    setQuestionNumber(questionNumber - 1);
  };

  return (
    <div>
      <div className='flex items-start justify-between'>
        <div>
          <p>total questions added: {questions.length}</p>
        </div>

        <button onClick={handleCompleteTest} type='button'>
          Complete test
        </button>
      </div>
      <form
        className={"flex flex-col items-center p-5 w-full"}
        onSubmit={onSubmit}
      >
        {testName ? (
          <p
            onClick={() => {
              setTestName("");
            }}
            className='text-lg h-[42px]'
          >
            {testName}
          </p>
        ) : (
          <input
            className={
              "w-[calc(50%-10px)] text-black p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
            }
            type={"text"}
            placeholder={"Test name"}
            name='name'
            onKeyDown={handleKeyPress}
          />
        )}
        <p className='self-start'>question number: {questionNumber}</p>
        <textarea
          className={
            "w-full text-black my-4 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
          }
          name='question'
        />

        <div className='flex flex-wrap gap-5'>
          <input
            className={
              "placeholder:text-green-400 w-[calc(50%-10px)] text-black p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
            }
            type={"text"}
            placeholder={"correct answer"}
            name='correctAnswer'
            onKeyDown={handleKeyPress}
          />
          <input
            className={
              "w-[calc(50%-10px)] text-black p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
            }
            type={"text"}
            placeholder={"answer"}
            name='answer2'
            onKeyDown={handleKeyPress}
          />
          <input
            className={
              "w-[calc(50%-10px)] text-black p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
            }
            type={"text"}
            placeholder={"answer"}
            name='answer3'
            onKeyDown={handleKeyPress}
          />
          <input
            className={
              "w-[calc(50%-10px)] text-black p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
            }
            type={"text"}
            placeholder={"answer"}
            name='answer4'
            onKeyDown={handleKeyPress}
          />
        </div>
        <button
          className={
            "mt-4 border-2 border-white py-2 rounded hover:bg-white hover:text-black p-2 cursor-pointer"
          }
          type='submit'
        >
          create
        </button>

        {/* {errorMessage && <p className='text-red-500'>{errorMessage}</p>} */}
      </form>
      <AddedQuestionsList
        questions={questions}
        onDeleteQuestion={handleDeleteQuestion}
      />
    </div>
  );
};

export default Create;
