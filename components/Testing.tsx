"use client";

import { FC, MouseEventHandler, useState } from "react";
import Image from "next/image";

import Stepper from "./stepper/Stepper";
import TestResult from "./testResult/TestResult";
import Button from "./shared/buttons/Button";

import { Question, TestResponse } from "@/types/test";

type TestingProps = {
  test: TestResponse;
};

const Testing: FC<TestingProps> = ({ test }) => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [uncorrectedAnswer, setUncorrectedAnswer] = useState<Question[]>([]);
  const [viewResult, setViewResult] = useState(false);

  const handleAnswerClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (
      (e.target as HTMLButtonElement).textContent ===
      test.questions[questionNumber].correctAnswer
    ) {
      setCorrectAnswer(correctAnswer + 1);
    } else {
      setUncorrectedAnswer((prev) => [...prev, test.questions[questionNumber]]);
    }

    if (test.questions.length - 1 === questionNumber) {
      setViewResult(true);
      return;
    }

    setQuestionNumber(questionNumber + 1);
  };

  const imageUrl = test.questions[questionNumber].image?.url;

  return (
    <>
      {!viewResult ? (
        <>
          <h1 className='mb-4 text-violet text-xl font-bold'>{test.name}</h1>
          <Stepper
            steps={test.questions}
            currentStep={questionNumber}
            setCurrentStep={setQuestionNumber}
          />
          <Image
            src={
              imageUrl ||
              "https://res.cloudinary.com/dn5s7eije/image/upload/v1708622607/custom_folder/1708624937481.jpg"
            }
            alt='question image'
            width={500}
            height={500}
            className='max-h-[50vh] object-cover mx-auto mb-5'
          />
          <p className='bg-white text-sm rounded-lg p-2 min-h-[100px] mb-3 text-text-color'>
            {test.questions[questionNumber].question}
          </p>
          <ul className='flex flex-wrap gap-4 mb-3'>
            {test.questions[questionNumber].answer.map((ans, i) => {
              return (
                <li
                  className='w-[calc(50%-10px)] bg-grey-2 rounded text-text-color hover:bg-grey-3'
                  key={i}
                >
                  <button
                    onClick={handleAnswerClick}
                    className='w-full h-full p-2 flex'
                    type='button'
                  >
                    {ans !== "" ? ans : "Не знаю"}
                  </button>
                </li>
              );
            })}
          </ul>
          <Button className='ml-auto' onClick={handleAnswerClick}>
            skip
          </Button>
        </>
      ) : (
        <TestResult
          test={test}
          uncorrectedAnswer={uncorrectedAnswer}
          correctAnswer={correctAnswer}
        />
      )}
    </>
  );
};

export default Testing;
