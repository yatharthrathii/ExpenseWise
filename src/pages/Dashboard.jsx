import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate("/expenses");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 flex flex-col overflow-x-hidden">
            <div className="flex flex-col justify-center items-center text-center px-4 pt-40 sm:px-6 py-20 flex-grow w-full">
                <div className="w-full max-w-3xl">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-indigo-700 leading-tight break-words">
                        Welcome to <span className="text-violet-600">expenseWish 🎯</span>
                    </h1>
                    <p className="text-gray-700 text-base sm:text-lg md:text-xl mt-4">
                        Track your daily expenses and take control of your finances.
                        <br />
                        Stay consistent, stay smart.
                    </p>
                    <button
                        onClick={handleGetStarted}
                        className="mt-8 bg-gradient-to-r from-violet-600 to-indigo-700 hover:from-violet-700 hover:to-indigo-800 text-white font-semibold py-3 px-8 rounded-full transition duration-300 text-lg"
                    >
                        Get Started
                    </button>
                </div>
            </div>

            <HeroSection />
        </div>
    );
};

export default Dashboard;
