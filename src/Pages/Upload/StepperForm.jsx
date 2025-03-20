import React, { useState } from 'react';
import { Stepper} from '@mantine/core';
import CourseForm from './CourseForm'; 
import DetailsForm from './DetailsForm';

const StepperForm = () => {
    const [active, setActive] = useState(0); 

    return (
        <section className="py-4">
            <Stepper active={active} allowNextStepsSelect={false} color="#023336">
                <Stepper.Step label="First step" description="Select Academic Year & Semester ">
                    <DetailsForm setActive={setActive}/>
                </Stepper.Step>

                <Stepper.Step label="Second step" description="Add Subject Content">
                    <CourseForm />
                </Stepper.Step>

                <Stepper.Completed>
                    Completed, click back button to get to previous step
                </Stepper.Completed>
            </Stepper>
        </section>
    );
};

export default StepperForm;
