import React, { useState } from 'react'


export function useForm(steps: React.ReactNode[] = []) {

    const [currentStep, setCurrentStep] = useState(0)

    const changedSteps = (idx: number, event?: React.MouseEvent<HTMLButtonElement>) => {
        event?.preventDefault()

        if (idx < 0 || idx >= steps.length) return
        setCurrentStep(idx)
    }

    return {
        currentStep,
        currentComponent: steps[currentStep] || null,
        changedSteps,
        isLastStep: currentStep + 1 === steps.length - 1 ? true : false,
    };
}
