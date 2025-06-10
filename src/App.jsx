import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import Header from './components/Header'
import Main from "./pages/Main"

function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/main' element={<Main />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
