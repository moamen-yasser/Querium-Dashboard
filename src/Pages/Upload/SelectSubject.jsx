import { useForm } from 'react-hook-form';
import SelectBox from '../../Forms/SelectBox';
import { Button, Group } from '@mantine/core';

const SelectSubject = ({setActive}) => {
    const subjects = JSON.parse(localStorage.getItem('subjects') || '[]');
    
    const subjectOptions = subjects?.data?.map(subject => ({
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
        const selectedSubject = subjects?.data?.find(subject => subject?.data?.id.toString() === data?.subjectName);
        localStorage.setItem('selectedSubject', JSON.stringify(subjectOptions));
        setActive(2);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-8 lg:pr-[50%]'>
                <SelectBox
                    name="subjectName"
                    control={control}
                    label="Subject Name"
                    placeholder="Select Subject"
                    data={subjectOptions}
                    rules={{ required: 'Subject Name is required' }}
                    required
                />

                <Group mt="md" className='!flex !justify-center !w-full'>
                    <Button 
                        type="submit" 
                        disabled={!isValid}
                        className={`!mt-4 !bg-textSecondColor !font-bold !text-lg !w-[80%] !h-[50px] !text-white hover:!bg-hoverColor !rounded-xl !py-2 !px-6`}
                        loaderProps={{ type: "dots" }}
                    >
                        Next
                    </Button>
                </Group>
            </form>
        </div>
    )
}

export default SelectSubject