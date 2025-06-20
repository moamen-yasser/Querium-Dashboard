import { lazy, Suspense, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Loader from '../Components/Loader.jsx';
import ProtectedRoute from '../Components/ProtectedRoute.jsx';
import { AuthContext } from '../AuthContext/AuthProvider.jsx'; 

// Lazy load the components
const Dashboard = lazy(() => import('../Pages/Dashboard.jsx'));
const Questions = lazy(() => import('../Pages/Questions/Questions.jsx'));
const Chapters = lazy(() => import('../Pages/Chapters/Chaptes.jsx'));
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
                        <Suspense fallback={<Loader isLoading={true} />}>
                            <Login />
                        </Suspense>
                    }
                />

                <Route
                    path="/dashboard/:tabValue"
                    element={
                        <Suspense fallback={<Loader isLoading={true} />}>
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Dashboard />
                            </ProtectedRoute>
                        </Suspense>
                    }
                />

                <Route
                    path="/questions"
                    element={
                        <Suspense fallback={<Loader isLoading={true}/>}>
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Questions />
                            </ProtectedRoute>
                        </Suspense>
                    }
                />

                <Route
                    path="/chapters"
                    element={
                        <Suspense fallback={<Loader isLoading={true}/>}>
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Chapters />
                            </ProtectedRoute>
                        </Suspense>
                    }
                />
            </Routes>
        </Router>
    );
}