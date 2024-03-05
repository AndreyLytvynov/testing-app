import { Question } from "@/types/test";
import Image from "next/image";
import { MdDelete } from "react-icons/md";

interface QuestionListProps {
  questions: Question[];
  onDeleteQuestion: (questionText: string) => void;
}

const AddedQuestionsList: React.FC<QuestionListProps> = ({
  questions,
  onDeleteQuestion,
}) => {
  return (
    <>
      <p className='font-semibold text-text-color text-sm mb-4'>
        Total questions added: {questions.length}
      </p>
      <ul className='flex flex-col gap-4'>
        {questions?.map(({ question, answer, image }, i) => {
          return (
            <li key={i} className='bg-light-2 rounded-xl p-3 pr-8 relative'>
              <div className='flex justify-between gap-3'>
                {image?.url && (
                  <Image
                    src={image?.url}
                    alt='question image'
                    width={300}
                    height={300}
                    className='w-[300px] h-[300px] object-cover'
                  />
                )}
                <p className='flex-1 font-semibold text-text-color text-xs'>
                  {question ? question : ""}
                </p>
              </div>
              <ul className='mt-2 w-full flex flex-wrap gap-2'>
                {answer.map((answer, i) => {
                  if (answer === "") return null;
                  return (
                    <li
                      className='w-[calc(50%-5px)] p-1 px-2 bg-white rounded-lg'
                      key={i}
                    >
                      <p className='text-xs'>{answer}</p>
                    </li>
                  );
                })}
              </ul>
              <button
                className='text-red-400 hover:text-red-500 absolute top-2 right-2'
                type='button'
                onClick={() => onDeleteQuestion(question)}
              >
                <MdDelete size={20} />
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default AddedQuestionsList;
