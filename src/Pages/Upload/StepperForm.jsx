import React, { useState } from 'react';
import { Button, Stepper } from '@mantine/core';
import Lottie from 'lottie-react';
import CourseForm from './CourseForm'; 
import DetailsForm from './DetailsForm';
import SelectSubject from './SelectSubject';
import AddedJson from "./AddJson.json";

const StepperForm = () => {
    const [active, setActive] = useState(0); 

    return (
        <section className="py-4">
            <Stepper active={active} allowNextStepsSelect={false} color="#023336">
                <Stepper.Step label="First step" description="Select Academic Year & Semester ">
                    <DetailsForm setActive={setActive} />
                </Stepper.Step>

                <Stepper.Step label="Second step" description="Select Subject">
                    <SelectSubject setActive={setActive} />
                </Stepper.Step>

                <Stepper.Step label="Third step" description="Add Subject Content">
                    <CourseForm setActive={setActive} />
                </Stepper.Step>

                <Stepper.Completed>
                    <div className="flex justify-center items-center flex-col mt-8 w-full">
                        <div className="w-48 flex justify-center items-center">
                            <Lottie animationData={AddedJson} loop={true} />
                        </div>
                        <div>
                            <Button
                                onClick={() => setActive(0)}
                                className="!bg-main !text-white !text-lg !py-2 !px-10 !font-semibold !mt-12 !w-fit"
                            >
                                Done
                            </Button>
                        </div>
                    </div>
                </Stepper.Completed>
            </Stepper>
        </section>
    );
};

export default StepperForm;
