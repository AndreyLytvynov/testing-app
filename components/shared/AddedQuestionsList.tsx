import { Question } from "@/app/(root)/create-test/create/page";
import React from "react";

interface QuestionListProps {
  questions: Question[];
  onDeleteQuestion: (questionText: string) => void;
}

const AddedQuestionsList: React.FC<QuestionListProps> = ({
  questions,
  onDeleteQuestion,
}) => {
  return (
    <div>
      <h2 className='mb-5'>Question List</h2>
      <ul className='flex flex-col gap-4'>
        {questions?.map(({ question, answer }) => {
          return (
            <li key={question} className='border border-black'>
              <button
                className='border border-green-400'
                type='button'
                onClick={() => onDeleteQuestion(question)}
              >
                delete
              </button>
              <p>{question}</p>
              <ul className='flex flex-wrap gap-4'>
                {answer.map((answer) => {
                  if (answer === "") return null;
                  return (
                    <li className='border border-red-500' key={answer}>
                      {answer}
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AddedQuestionsList;
