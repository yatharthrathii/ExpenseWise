import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import Header from './components/Header'
import CompleteProfile from './pages/CompleteProfile'
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import Dashboard from './pages/Dashboard'
import Expenses from './pages/Expenses'
import { useSelector } from "react-redux";
import Footer from './components/Footer';

function App() {

  const isDark = useSelector((state) => state.theme.isDarkMode);

  return (
    <>
      <div className={isDark ? "dark" : ""}>
        <ToastContainer position="top-right" autoClose={3000} />
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/expenses' element={<Expenses />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </>
  )
}

export default App
