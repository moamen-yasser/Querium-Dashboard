import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, Button } from '@mantine/core'; 
import TextInputField from '../../Forms/TextInputField';
import BackgroundImage from '../../assets/loginBG.png';
import { yupResolver } from '@hookform/resolvers/yup';
import Logo from '../../assets/newLogo.png';
import LoginSchema from './LoginSchema';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext/AuthProvider';
import PasswordInput from '../../Forms/PasswordInput';
import { useLoginMutation } from '../../Service/Apis';
import Loader from '../../Components/Loader';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [LoginApi, { isLoading: isLoadingLogin }] = useLoginMutation();

    const [errorMessage, setErrorMessage] = useState(''); 

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(LoginSchema),
        mode: 'onChange',
    });

    const onSubmit = async (data) => {
        console.log(isLoadingLogin)
        try {
            const result = await LoginApi({email: data?.email, password: data?.password}).unwrap();    
            if (result) {
                login(result); 
                setErrorMessage('');
                navigate('/dashboard/home');
            }
        } catch (err) {
            console.error('Login Failed:', err);
            setErrorMessage('Login failed. Please check your credentials.');
        }
    };

    console.log(isLoadingLogin);

    return (
        <section 
            className='flex flex-col justify-start items-center w-full h-screen' 
            style={{
                backgroundImage: `url(${BackgroundImage})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
            }}
        >
            <div className="w-full flex justify-center">
                <img src={Logo} alt="Querium" className="!w-80 !h-80" />
            </div>
            <Card className='shadow-2xl py-4 rounded-2xl w-full max-w-[500px] bg-white'>
                {errorMessage && (
                    <div className="text-white bg-red-500 -mt-4 p-2 text-center font-semibold mb-4 rounded-t-lg">
                        {errorMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }} className='space-y-4 px-4'>
                    <TextInputField
                        control={control}
                        name="email"
                        placeholder="Enter Admin Email"
                        error={errors.email?.message}
                        label="Email"
                    />

                    <PasswordInput
                        control={control}
                        name="password"
                        placeholder="Enter Admin Password"
                        error={errors.password?.message}
                        label="Password"
                    />

                    <Button
                        type="submit"
                        className={` !w-full !text-center !text-2xl !font-bold !rounded-lg !h-10 !mt-7 ${
                            !isValid  ? "!bg-gray !cursor-not-allowed !text-white" : "!bg-main !text-white !cursor-pointer"
                        } `}
                        loading={isLoadingLogin}
                        disabled={isLoadingLogin || !isValid}
                        loaderProps={{ type: "dots" }}
                    >
                        Login
                    </Button>
                </form>
            </Card>
        </section>
    );
};

export default Login;
