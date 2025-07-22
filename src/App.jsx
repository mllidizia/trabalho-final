import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Livros from './pages/Livros';
import Usuarios from './pages/Usuarios';
import './App.css';

// Componente para proteger rotas
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Componente principal do App
const AppContent = () => {
  const { isAuthenticated, login } = useAuth();

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
                <Navigate to="/dashboard" /> : 
                <Login onLogin={login} />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
                    <Route 
            path="/livros" 
            element={
              <ProtectedRoute>
                <Livros />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/usuarios" 
            element={
              <ProtectedRoute>
                <Usuarios />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/" 
            element={<Navigate to="/dashboard" />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
