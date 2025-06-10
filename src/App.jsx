import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import Header from './components/Header'
import CompleteProfile from './pages/CompleteProfile'
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import Dashboard from './pages/Dashboard'
import Expenses from './pages/Expenses'

function App() {

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/my-expenses' element={<Expenses />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
