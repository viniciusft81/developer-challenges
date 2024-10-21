import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from "./pages/login";
import { Dashboard } from './pages/dashboard';
import { SignUp } from './pages/signup';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to='/login' replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
