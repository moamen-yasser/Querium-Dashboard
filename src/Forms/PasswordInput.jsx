import React, { useState } from 'react';
import { TextInput } from '@mantine/core';
import { Controller } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordInput = ({ control, name, placeholder, error, label }) => {
    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisibility((prev) => !prev); // Toggle visibility
    };

    return (
        <div className='md-2'>
            <label className="block text-lg font-bold text-main ml-1 mb-1">{label}</label>
            <Controller
                name={name}
                defaultValue=""
                control={control}
                render={({ field }) => (
                    <TextInput
                        {...field}
                        placeholder={placeholder}
                        type={passwordVisibility ? 'text' : 'password'} // Toggle input type
                        className="w-full !relative"
                        classNames={{
                            input: `!p-3 !rounded-lg !w-full border ${error ? 'border-red-500' : 'border-gray'}`,
                            error: 'text-red-500 text-xs ml-1 !relative',
                        }}
                        error={error}
                        rightSection={
                            <div
                                onClick={togglePasswordVisibility} // Toggle visibility on click
                                className='cursor-pointer '
                            >
                                {passwordVisibility ? (
                                    <FaEyeSlash size={18} className="!text-blue-900" />
                                ) : (
                                    <FaEye size={18} className="!text-gray-500" />
                                )}
                            </div>
                        }
                    />
                )}
            />
        </div>
    );
};

export default PasswordInput;