import React from "react";
import { FileInput } from "@mantine/core";
import { Controller } from "react-hook-form";

const FileUploadInput = ({ control, name, placeholder, error, label }) => {
    const handleFileChange = (file) => {
        if (file) {
            console.log("Selected file:", file);
        }
    };

    return (
        <div>
            <label className="block text-lg font-bold text-main ml-1 mb-1">{label}</label>
            <Controller
                name={name}
                defaultValue={null}
                control={control}
                render={({ field }) => (
                    <FileInput
                        {...field}
                        placeholder={placeholder}
                        onChange={(file) => {
                            field.onChange(file);
                            handleFileChange(file);
                        }}
                        className="w-full"
                        classNames={{
                            input: `p-3 !rounded-lg !w-full border text-left bg-white ${error ? "border-red-500" : "border-gray"}`,
                            placeholder: "!text-inputsPlaceholder !opacity-100",
                            error: "text-red-500 text-xs ml-1",
                        }}
                        accept=".pdf" 
                        error={error}
                    />
                )}
            />
        </div>
    );
};

export default FileUploadInput;