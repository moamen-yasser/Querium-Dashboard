import React, { useContext } from 'react';
import { MdLogout } from 'react-icons/md';
import { AuthContext } from '../AuthContext/AuthProvider';
import { useLogoutMutation } from '../Service/Apis/authApi';
import { showNotification } from '../utils/notification';

const Logout = () => {
    const { logout } = useContext(AuthContext); 
    const [logoutApi] = useLogoutMutation(); 

    const handleLogout = async () => {
        try {
        const response =await logoutApi().unwrap();
        console.log('Logout API call successful');
        showNotification.success(response);
        logout();
        } catch (error) {
        console.error('Logout failed:', error);
        showNotification.error(error);
        }
    };

    return (
        <div
            onClick={handleLogout}
            className='w-full flex gap-8 items-center font-semibold text-xl px-7 py-3 mt-32 text-logout cursor-pointer'
        >
            <MdLogout size={35} /> Logout
        </div>
    );
};

export default Logout;