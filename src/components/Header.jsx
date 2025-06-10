import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);

            const publicPaths = ['/login', '/signup', '/', '/forgot-password'];

            if (!user && !publicPaths.includes(location.pathname)) {
                navigate('/login');
            }
        });
        return () => unsubscribe();
    }, [location.pathname, navigate]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error.message);
            alert('Failed to log out. Please try again.');
        }
    };

    const handleProtectedNavigation = (path) => {
        if (!currentUser) {
            alert("Please log in to access this page.");
            navigate('/login');
        } else {
            navigate(path);
        }
        setIsMenuOpen(false);
    };

    return (
        <header className="bg-gradient-to-r from-violet-600 to-indigo-700 text-white shadow-lg p-4 md:p-6 fixed w-full top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo/Title */}
                <div className="flex items-center">
                    <span className="text-xl md:text-2xl font-extrabold tracking-tight cursor-pointer" onClick={() => navigate('/')}>
                        💸 ExpenseWise
                    </span>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6">
                    <button
                        onClick={() => handleProtectedNavigation('/dashboard')}
                        className="text-white hover:text-indigo-200 transition-colors duration-300 font-medium"
                    >
                        Dashboard
                    </button>
                    <button
                        onClick={() => handleProtectedNavigation('/expenses')}
                        className="text-white hover:text-indigo-200 transition-colors duration-300 font-medium"
                    >
                        My Expenses
                    </button>
                    {loading ? (
                        <span className="text-indigo-200">Loading...</span>
                    ) : currentUser ? (
                        <>
                            <button
                                onClick={() => handleProtectedNavigation('/complete-profile')}
                                className="text-white hover:text-indigo-200 transition-colors duration-300 text-lg font-medium"
                            >
                                Profile
                            </button>
                            <button
                                onClick={handleLogout}
                                className="bg-white text-violet-600 px-5 py-2 rounded-full font-semibold hover:bg-indigo-100 transition-all duration-300 shadow-md"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-white text-violet-600 px-5 py-2 rounded-full font-semibold hover:bg-indigo-100 transition-all duration-300 shadow-md"
                        >
                            Login
                        </button>
                    )}
                </nav>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <nav className="md:hidden bg-violet-700 pb-4 pt-2 mt-2 rounded-lg shadow-inner">
                    <div className="flex flex-col items-center space-y-3">
                        <button
                            onClick={() => handleProtectedNavigation('/dashboard')}
                            className="w-full text-center py-2 text-white hover:bg-violet-600 rounded-md transition-colors duration-300"
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={() => handleProtectedNavigation('/expenses')}
                            className="w-full text-center py-2 text-white hover:bg-violet-600 rounded-md transition-colors duration-300"
                        >
                            My Expenses
                        </button>
                        {loading ? (
                            <span className="text-indigo-200 py-2">Loading...</span>
                        ) : currentUser ? (
                            <>
                                <button
                                    onClick={() => handleProtectedNavigation('/complete-profile')}
                                    className="w-full text-center py-2 text-white hover:bg-violet-600 rounded-md transition-colors duration-300"
                                >
                                    Profile
                                </button>
                                <button
                                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                                    className="w-11/12 text-center py-2 bg-white text-violet-600 rounded-md font-semibold hover:bg-indigo-100 transition-all duration-300"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => { navigate('/login'); setIsMenuOpen(false); }}
                                className="w-11/12 text-center py-2 bg-white text-violet-600 rounded-md font-semibold hover:bg-indigo-100 transition-all duration-300"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </nav>
            )}
        </header>
    );
};

export default Header;