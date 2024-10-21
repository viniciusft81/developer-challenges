import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from "./pages/login";
import { Dashboard } from './pages/dashboard';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to='/login' replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
