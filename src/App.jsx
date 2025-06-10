import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import Header from './components/Header'
import CompleteProfile from './pages/CompleteProfile'
import ForgotPasswordPage from "./pages/ForgotPasswordPage"

function App() {

  return (
    <>
      <Router>
        <Header />
        <div className="pt-20">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
