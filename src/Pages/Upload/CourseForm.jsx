import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mantine/core';
import ValidationSchema from '../../Forms/ValidationSchema';
import { IoIosAddCircleOutline } from 'react-icons/io';
import FileUploadInput from '../../Forms/FileUploadInput';
import { useUploadSubjectMutation, useUploadFileMutation } from '../../Service/Apis/subjectApi';
import { showNotification } from '../../utils/notification';
import { transformQuizData } from '../../Functions/transformQuizData';
import { AiFillCloseCircle } from 'react-icons/ai';
import TextInputField from '../../Forms/textinputfield';
import { useState } from 'react';

const CourseForm = ({ setActive, setChapterID }) => {
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
    const [uploadFile, {isLoading: isLoadingFile}] = useUploadFileMutation();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'chapters',
    });

    const onSubmit = async (data) => {
        const selectedSubject = localStorage.getItem('selectedSubject');
        const subjectId = selectedSubject?.data?.id || 1;

        let successCount = 0;
        let failCount = 0;
        let errorMessages = [];

        for (const [index, chapter] of data?.chapters.entries()) {
            try {
                // 1. Prepare chapter data payload (without file)
                const payload = {
                    title: chapter.chapterTitle,
                    description: chapter.chapterDescription,
                    pdfPath: "", // Will be updated after file upload
                    subjectId: subjectId
                };

                // 2. Upload the chapter data first
                const response = await uploadSubject({
                    body: payload,
                    id: subjectId
                }).unwrap();


                setChapterID(response?.id)
                // 3. Upload the file if it exists, using the returned chapter ID
                let filePath = "";
                if (chapter.chapterFile && response?.id) {
                    const formData = new FormData();
                    formData.append('file', chapter.chapterFile);

                    const fileResponse = await uploadFile({
                        body: formData,
                        id: response.id // or response?.data?.id depending on your API
                    }).unwrap();

                    filePath = fileResponse?.path || fileResponse?.url || "";
                    // Optionally, update the chapter with the file path if your backend requires it
                }

                // 4. Optionally, update the chapter with the file path if needed
                // (If your backend requires a PATCH/PUT to update the chapter with the file path, do it here)

                if (response?.questions) {
                    const transformedData = transformQuizData(response.questions);
                    console.log('Transformed Data:', transformedData);
                }

                successCount++;
            } catch (error) {
                failCount++;
                errorMessages.push(`Chapter ${index + 1}: ${error?.message || 'Unknown error'}`);
                console.error(error);
            }
        }

        // Show summary notification
        if (failCount === 0) {
            showNotification.success(`${successCount} chapters uploaded successfully`);
            reset();
            setActive(3);
        } else {
            showNotification.error(
                `${successCount} chapters uploaded, ${failCount} failed.\n${errorMessages.join('\n')}`
            );
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
                                disabled={isLoadingUpload || isLoadingFile}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className={`!bg-main !text-white hover:!bg-hoverColor !rounded-lg !px-6 !py-2
                                    `}
                                disabled={!isValid || isLoadingUpload || isLoadingFile}
                                loading={isLoadingUpload || isLoadingFile}
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