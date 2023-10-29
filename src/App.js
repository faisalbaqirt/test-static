import { BrowserRouter,Routes, Route, Navigate } from "react-router-dom"
import TestLayout from "./pages/Test"
import Admin from "./pages/Admin"
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";


function App() {
  const isAuthenticated = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<TestLayout />} />
        <Route path="/coba" element={<Admin />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/profile" /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/profile" /> : <Register />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
