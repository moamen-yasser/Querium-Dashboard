
import * as yup from 'yup';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,32}$/;

const LoginSchema = yup.object().shape({
    email: yup
        .string()
        .matches(emailRegex, 'Please enter a valid email address') 
        .required('Email is required'),
    password: yup
        .string()
        .matches(
            passwordRegex,
            'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'
        ) 
        .required('Password is required'),
});

export default LoginSchema




