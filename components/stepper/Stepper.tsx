import React, { Dispatch, FC, SetStateAction } from "react";
import "./stepper.css";

import { Question } from "@/types/test";

type StepperProps = {
  steps: Question[];
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
};

const Stepper: FC<StepperProps> = ({ steps, currentStep, setCurrentStep }) => {
  return (
    <div className='flex flex-col gap-10 items-center justify-center mb-5'>
      <div className='flex justify-between w-full'>
        {steps?.map((_, i) => (
          <div
            key={i}
            className={`step-item w-[calc(50%-10px)] ${
              currentStep + 1 === i + 1 && "active"
            }`}
          >
            <div className='step'></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
