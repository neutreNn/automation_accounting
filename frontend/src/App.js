import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import ChartsPage from './components/pages/ChartsPage';
import TrashCanPage from './components/pages/TrashCanPage';
import WorkersPage from './components/pages/WorkersPage';
import GearPage from './components/pages/GearPage';
import LogsPage from './components/pages/LogsPage';
import LoginPage from './components/pages/LoginPage';
import ProtectedRoute from './components/sections/ProtectedRoute';
import CircleLoader from './components/common/CircleLoader';
import { useValidateTokenMutation } from './api/apiUser';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [validateToken] = useValidateTokenMutation();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await validateToken().unwrap();
        if (response.valid) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error('Ошибка проверки токена:', err);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, [validateToken]);

  if (loading) {
    return <CircleLoader />;
  }

  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/gears" /> : <LoginPage />}
          />
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/gears" element={<GearPage />} />
            <Route path="/workers" element={<WorkersPage />} />
            <Route path="/statistics" element={<ChartsPage />} />
            <Route path="/logs" element={<LogsPage />} />
            <Route path="/trash-can" element={<TrashCanPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
