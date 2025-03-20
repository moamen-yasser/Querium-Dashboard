import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mantine/core';
import ValidationSchema from '../../Forms/ValidationSchema';
import TextInputField from '../../Forms/TextInputField';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { RiChatDeleteFill } from 'react-icons/ri';
import FileUploadInput from '../../Forms/FileUploadInput';
import ImageBox from '../../Forms/ImageBox';

const CourseForm = () => {
    const [resetTrigger, setResetTrigger] = useState(false);
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(ValidationSchema),
        defaultValues: {
            subjectImage: null,
            subjectTitle: '',
            subjectDescription: '',
            chapters: [{ chapterTitle: '', chapterDescription: '', chapterFile: null }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'chapters',
    });

    const onSubmit = (data) => {
        console.log(data);
        resetForm();
        setValue('fileImage', null);
    };

    const resetForm = () => {
        reset(); 
        setResetTrigger(prev => !prev); 
    };

    return (
        <div className="">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex gap-8">
                    <div className="flex-1 w-3/4 space-y-4">
                        <TextInputField
                            control={control}
                            name="subjectTitle"
                            placeholder="Add Subject Title"
                            error={errors.subjectTitle?.message}
                            label="Subject Title"
                        />

                        <TextInputField
                            control={control}
                            name="subjectDescription"
                            placeholder="Add Subject Description"
                            error={errors.subjectDescription?.message}
                            label="Subject Description"
                        />

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
                                                <RiChatDeleteFill color="red" size={20} />
                                            </Button>
                                        )}

                                        <TextInputField
                                            control={control}
                                            name={`chapters.${index}.chapterTitle`}
                                            placeholder="Add Chapter Title"
                                            error={errors.chapters?.[index]?.chapterTitle?.message}
                                            label="Chapter Title"
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
                                            placeholder="Upload File"
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
                                className={`mt-4 px-12 text-main text-xl font-paragarphFont font-semibold flex justify-center items-center gap-1 w-full
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
                                onClick={() => resetForm()}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="!bg-main !text-white hover:!bg-hoverColor !rounded-lg !px-6 !py-2"
                            >
                                Confirm
                            </Button>
                        </div>
                    </div>

                    <div className="w-1/4 flex flex-row justify-center items-start">
                        <ImageBox
                            control={control}
                            name="subjectImage"
                            error={errors.subjectImage?.message}
                            label="Subject Image"
                            setValue={setValue}
                            resetTrigger={resetTrigger}
                        />
                    </div>
                </div>

            </form>
        </div>
    );
};

export default CourseForm;