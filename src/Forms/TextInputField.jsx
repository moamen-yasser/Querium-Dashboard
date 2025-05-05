import React from "react";
import { Textarea, TextInput } from "@mantine/core";
import { Controller } from "react-hook-form";

const TextInputField = ({ control, name, placeholder, error, label, login, title }) => {
    return (
        <div className="mb-2">
            <label className="block text-lg font-bold text-main ml-1 mb-1">{label}</label>
            <Controller
                name={name}
                defaultValue=""
                control={control}
                render={({ field }) => (
                    login || title ? (
                        <TextInput
                            {...field}
                            placeholder={placeholder}
                            className="w-full"
                            classNames={{
                                input: `!p-3 !rounded-lg !text-base !w-full !h-[40px]`,
                                error: "text-red-500 text-xs ml-1",
                            }}
                            error={error}
                        />
                    ) : (
                        <Textarea
                            {...field}
                            placeholder={placeholder}
                            className="w-full"
                            classNames={{
                                input: `!p-3 !rounded-lg !text-base !w-full`,
                                error: "text-red-500 text-xs ml-1",
                            }}
                            autosize
                            minRows={4}
                            error={error}
                        />
                    )
                )}
            />
        </div>
    );
};

export default TextInputField;