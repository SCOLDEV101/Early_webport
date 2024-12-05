import React, { useState } from 'react'

type useForm_Props = {
    steps: any,
}


export function useForm(steps?: any) {

    const [currentStep, setCurrentStep] = useState(0)

    const changedSteps = (idx: number, event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        
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
