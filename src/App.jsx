import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from './components/Header';
import Footer from './components/Footer';
import { useSelector } from "react-redux";
import { lazy, Suspense } from 'react';


const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const CompleteProfile = lazy(() => import("./pages/CompleteProfile"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Expenses = lazy(() => import("./pages/Expenses"));

function App() {
  const isDark = useSelector((state) => state.theme.isDarkMode);

  return (
    <div className={isDark ? "dark" : ""}>
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <Header />
        <Suspense fallback={<div className="loader">Loading...</div>}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/expenses' element={<Expenses />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
