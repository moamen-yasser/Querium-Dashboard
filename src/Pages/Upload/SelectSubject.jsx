import React from 'react'
import { useForm } from 'react-hook-form';
import SelectBox from '../../Forms/SelectBox';
import { Button, Group } from '@mantine/core';

const SelectSubject = ({setActive}) => {
    const subjects = JSON.parse(localStorage.getItem('subjects') || '[]');
    
    const subjectOptions = subjects.map(subject => ({
        value: subject.id.toString(),
        label: subject.title
    }));

    const { control, handleSubmit, formState: { isValid } } = useForm({
        mode: 'onChange', 
        defaultValues: {
            subjectName: '',
        },
    });

    const onSubmit = (data) => {
        const selectedSubject = subjects.find(subject => subject.id.toString() === data.subjectName);
        localStorage.setItem('selectedSubject', JSON.stringify(selectedSubject));
        setActive(2);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-8 pr-[50%]'>
                <SelectBox
                    name="subjectName"
                    control={control}
                    label="Subject Name"
                    placeholder="Select Subject"
                    data={subjectOptions}
                    rules={{ required: 'Subject Name is required' }}
                    required
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

export default SelectSubject