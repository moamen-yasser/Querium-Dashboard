import React, { useContext } from 'react';
import { MdLogout } from 'react-icons/md';
import { AuthContext } from '../AuthContext/AuthProvider';
import { useLogoutMutation } from '../Service/Apis';

const Logout = () => {
    const { logout } = useContext(AuthContext); 
    const [logoutApi, { isLoading: isLoadingLogout }] = useLogoutMutation(); 

    const handleLogout = async () => {
        try {
        await logoutApi().unwrap();
        console.log('Logout API call successful');

        logout();
        } catch (error) {
        console.error('Logout failed:', error);
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