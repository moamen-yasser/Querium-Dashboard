import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mantine/core';
import ValidationSchema from '../../Forms/ValidationSchema';
import { IoIosAddCircleOutline } from 'react-icons/io';
import FileUploadInput from '../../Forms/FileUploadInput';
import { useUploadSubjectMutation } from '../../Service/Apis/subjectApi';
import { showNotification } from '../../utils/notification';
import { transformQuizData } from '../../Functions/transformQuizData';
import { AiFillCloseCircle } from 'react-icons/ai';
import TextInputField from '../../Forms/textinputfield';

const CourseForm = ({ setActive }) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(ValidationSchema),
        defaultValues: {
            chapters: [{ chapterTitle: '', chapterDescription: '', chapterFile: null }],
        },
    });

    const [uploadSubject, {isLoading: isLoadingUpload}] = useUploadSubjectMutation();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'chapters',
    });

    const onSubmit = async (data) => {
        try {
            const selectedSubject = JSON.parse(localStorage.getItem('selectedSubject'));
            const formData = new FormData();
            
            // Create an array of chapter objects
            const chapters = data.chapters.map((chapter, index) => {
                const chapterObj = {
                    chapterTitle: chapter.chapterTitle,
                    chapterDescription: chapter.chapterDescription
                };
    
                // If there's a file, append it to FormData with the correct key
                // if (chapter.chapterFile) {
                //     const fileKey = `chapters[${index}][chapterFile]`;
                //     formData.append(fileKey, chapter.chapterFile);
                // }
                if (chapter.chapterFile) {
                    const fileKey = `file`;
                    formData.append(fileKey, chapter.chapterFile);
                }
    
                return chapterObj;
            });
    
            // Append the chapters array as JSON
            formData.append('chapters', JSON.stringify(chapters));
    
            const response = await uploadSubject({
                body: formData,
                id: selectedSubject?.id
            }).unwrap();

            console.log(response);

            const transformedData = transformQuizData(response?.questions);
            console.log('Transformed Data:', transformedData);
    
            showNotification.success(response);
            reset(); 
            setActive(3);
            console.log(data);
        } catch (error) {
            showNotification.error(error);
            console.error(error);
        }
    };

    return (
        <div className="">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex gap-8">
                    <div className="flex-1 w-3/4 space-y-4">
                        <div>
                            {fields?.map((lesson, index) => (
                                <div key={lesson?.id}>
                                    <label className="block text-lg font-bold text-main ml-1 mb-1">
                                        Chapter {index + 1}
                                    </label>

                                    <div className="mb-4 p-4 border rounded-lg relative">
                                        {fields?.length > 1 && (
                                            <Button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="!absolute !top-2 !right-2 !p-1 !bg-transparent"
                                            >
                                                <AiFillCloseCircle color="red" size={25} />
                                            </Button>
                                        )}

                                        <TextInputField
                                            control={control}
                                            name={`chapters.${index}.chapterTitle`}
                                            placeholder="Add Chapter Title"
                                            error={errors.chapters?.[index]?.chapterTitle?.message}
                                            label="Chapter Title"
                                            login ={true}
                                        />

                                        <TextInputField
                                            control={control}
                                            name={`chapters.${index}.chapterDescription`}
                                            placeholder="Add Chapter Description"
                                            error={errors.chapters?.[index]?.chapterDescription?.message}
                                            label="Chapter Description"
                                        />

                                        <FileUploadInput
                                            control={control}
                                            name={`chapters.${index}.chapterFile`}
                                            placeholder="Upload Chapter File"
                                            error={errors.chapters?.[index]?.chapterFile?.message}
                                            label="Chapter File"
                                        />
                                    </div>
                                </div>
                            ))}

                            <div
                                onClick={() =>
                                    append({ chapterTitle: '', chapterDescription: '', chapterFile: null })
                                }
                                className={`mt-4 px-0 lg:px-12 text-main text-sm lg:text-xl font-paragarphFont font-semibold flex justify-center items-center gap-1 w-full
                                    sm:text-base sm:w-auto before:h-0 before:m-2 before:border before:border-main before:flex-1 after:h-0 after:m-2 
                                    after:border after:border-main after:flex-1 
                                    transition ease-in-out duration-300 cursor-pointer hover:text-hoverColor`}
                            >
                                <IoIosAddCircleOutline /> Add a New Chapter
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4 !mt-8">
                            <Button
                                type="button"
                                variant="outline"
                                className="!text-gray border !border-gray !rounded-lg !px-6 !py-2"
                                onClick={() => reset()}
                                disabled={isLoadingUpload}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className={`!bg-main !text-white hover:!bg-hoverColor !rounded-lg !px-6 !py-2
                                    `}
                                disabled={!isValid || isLoadingUpload}
                                loading={isLoadingUpload}
                                loaderProps={{type: 'dots'}}
                            >
                                Confirm
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CourseForm;