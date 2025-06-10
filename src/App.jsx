import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import Header from './components/Header'
import Main from "./pages/Main"
import CompleteProfile from './pages/CompleteProfile'

function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/main' element={<Main />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
