import React, { useState, useEffect, useRef } from "react";

interface Step {
  description: string;
  completed: boolean;
  highlighted: boolean;
  selected: boolean;
}

interface StepperProps {
  steps: string[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  const [newStep, setNewStep] = useState<Step[]>([]);
  const stepsRef = useRef<Step[]>([]);

  const updateStep = (stepNumber: number, steps: Step[]): Step[] => {
    const newSteps = [...steps];
    let count = 0;
    while (count < newSteps.length) {
      // current step
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: true,
        };
        count++;
      } else if (count < stepNumber) {
        // step completed
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        };
        count++;
      } else {
        // step pending
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        };
        count++;
      }
    }

    return newSteps;
  };

  useEffect(() => {
    const stepsState: Step[] = steps.map((step, index) => ({
      description: step,
      completed: false,
      highlighted: index === 0 ? true : false,
      selected: index === 0 ? true : false,
    }));

    stepsRef.current = stepsState;
    const current = updateStep(currentStep - 1, stepsRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  const stepsDisplay = newStep.map((step, index) => (
    <div
      key={index}
      className={
        index !== newStep.length - 1
          ? "w-full flex items-center"
          : "flex items-center"
      }
    >
      <div className="relative flex flex-col items-center text-pink-600">
        <div
          className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3  ${
            step?.selected
              ? "bg-red-600 text-white font-bold border border-red-600 "
              : ""
          }`}
        >
          {step?.completed ? (
            <span className="text-white font-bold text-xl">&#10003;</span>
          ) : (
            index + 1
          )}
        </div>
        <div
          className={`absolute top-0  text-center mt-16 w-32 text-xs font-medium uppercase ${
            step?.highlighted ? "text-gray-900" : "text-gray-400"
          }`}
        >
          {step?.description}
        </div>
      </div>
      <div
        className={`flex-auto border-t-2 transition duration-500 ease-in-out  ${
          step?.completed ? "border-red-600" : "border-gray-300 "
        }  `}
      ></div>
    </div>
  ));

  return (
    <div className="mx-4 p-4 flex justify-between items-center">
      {stepsDisplay}
    </div>
  );
};

export default Stepper;
