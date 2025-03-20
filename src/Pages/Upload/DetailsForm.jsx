import React from 'react'
import { Button, Group, Select } from '@mantine/core';
import { useForm, Controller } from 'react-hook-form';
import SelectBox from '../../Forms/SelectBox';

const DetailsForm = ({setActive}) => {
    const { control, handleSubmit, formState: { isValid } } = useForm({
        mode: 'onChange', 
        defaultValues: {
            academicYear: '',
            semester: '',
        },
    });

    const onSubmit = (data) => {
        console.log('Form Data:', data);
        setActive(1); 
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-8 pr-[50%]'>
                <SelectBox
                    name="academicYear"
                    control={control}
                    label="Academic Year"
                    placeholder="Select Academic Year"
                    data={[
                        { value: '1', label: 'Year 1' },
                        { value: '2', label: 'Year 2' },
                        { value: '3', label: 'Year 3' },
                        { value: '4', label: 'Year 4' },
                    ]}
                    rules={{ required: 'Academic Year is required' }}
                    required
                />

                <SelectBox
                    name="semester"
                    control={control}
                    label="Semester"
                    placeholder="Select Semester"
                    data={[
                        { value: '1', label: 'Semester 1' },
                        { value: '2', label: 'Semester 2' },
                    ]}
                    rules={{ required: 'Semester is required' }}
                    required
                    mt="md"
                />

                <Group position="right" mt="md">
                    <Button 
                        type="submit" 
                        disabled={!isValid}
                        className={`!mt-4 !bg-textSecondColor !text-white hover:!bg-hoverColor !w-full !rounded-lg !py-2 !px-6 
                            ${!isValid ? "!opacity-50 !cursor-not-allowed" : ""}`}
                    >
                        Next
                    </Button>
                </Group>
            </form>
        </div>
    )
}

export default DetailsForm
