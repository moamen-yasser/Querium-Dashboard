import React, { lazy, Suspense, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Loading from '../Components/Loading.jsx';
import ProtectedRoute from '../Components/ProtectedRoute.jsx';
import { AuthContext } from '../AuthContext/AuthProvider.jsx'; 

// Lazy load the components
const Dashboard = lazy(() => import('../Pages/Dashboard.jsx'));
const Questions = lazy(() => import('../Pages/Questions/Questions.jsx'));
const Login = lazy(() => import('../Pages/Login/Login.jsx'));

export default function Routers() {
    const { isAuthenticated } = useContext(AuthContext); 

    return (
        <Router>
            <Routes>
                {/* Redirect root URL to login page */}
                <Route path="/" element={<Navigate to="/login" />} />

                {/* Login Route */}
                <Route
                    path="/login"
                    element={
                        <Suspense fallback={<Loading />}>
                            <Login />
                        </Suspense>
                    }
                />

                <Route
                    path="/dashboard/:tabValue"
                    element={
                        <Suspense fallback={<Loading />}>
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Dashboard />
                            </ProtectedRoute>
                        </Suspense>
                    }
                />

                <Route
                    path="/questions"
                    element={
                        <Suspense fallback={<Loading />}>
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Questions />
                            </ProtectedRoute>
                        </Suspense>
                    }
                />
            </Routes>
        </Router>
    );
}