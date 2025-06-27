import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, Button, Divider } from '@mantine/core'; 
import BackgroundImage from '../../assets/loginBG.png';
import { yupResolver } from '@hookform/resolvers/yup';
import Logo from '../../assets/logo.png';
import MET from '../../assets/met.png';
import LoginSchema from './LoginSchema';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext/AuthProvider';
import PasswordInput from '../../Forms/PasswordInput';
import TextInputField from '../../Forms/TextInputField';
import { useLoginMutation } from '../../Service/Apis/authApi';
import { showNotification } from '../../utils/notification';

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
                showNotification.success(result);
            }
        } catch (err) {
            console.error('Login Failed:', err);
            setErrorMessage('Login failed. Please check your credentials.');
            showNotification.error(err);
        }
    };

    console.log(isLoadingLogin);

    return (
        <section 
            className='flex flex-col justify-center items-center w-full h-screen space-y-5' 
            style={{
                backgroundImage: `url(${BackgroundImage})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
            }}
        >
            <div className="w-full flex justify-center items-center">
                <img src={Logo} alt="Querium" className="!w-60 !h-72" />
                <Divider size="sm" orientation="vertical" color="gray" />
                <img src={MET} alt="Querium" className="!w-52 !h-52 !ml-4" />
            </div>
            <Card className='!py-4 !rounded-2xl !w-full !max-w-[500px] !bg-white'>
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
                        login={true}
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
                        className={` !w-full !text-center !bg-main !text-2xl !font-bold !rounded-lg !h-10 !mt-7 !text-white`}
                        disabled={isLoadingLogin || !isValid}
                        loading={isLoadingLogin}
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
