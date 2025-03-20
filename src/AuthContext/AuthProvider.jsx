import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(Cookies.get('isAuthenticated') === 'true');

    const login = (credentials) => {
        if (credentials) {
            Cookies.set('isAuthenticated', 'true', { expires: 1 });
            Cookies.set('admin', JSON.stringify(credentials.admin), { expires: 1 });
        }
        setIsAuthenticated(true);
    };

    const logout = () => {
        Cookies.remove('isAuthenticated');
        Cookies.remove('admin');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};