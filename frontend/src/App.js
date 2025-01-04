import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/sections/Header';
import Footer from './components/sections/Footer';
import styled from 'styled-components';
import { SnackbarProvider } from 'notistack'
import ChartsPage from './components/pages/ChartsPage';
import TrashCanPage from './components/pages/TrashCanPage';
import WorkersPage from './components/pages/WorkersPage';
import GearPage from './components/pages/GearPage';
import LogsPage from './components/pages/LogsPage';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

function App() {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
      <Router>
        <AppContainer>
          <Header />
          <MainContent>
            <Routes>
              <Route path="/" element={<GearPage />} />
              <Route path="/workers" element={<WorkersPage />} />
              <Route path="/statistics" element={<ChartsPage />} />
              <Route path="/logs" element={<LogsPage />} />
              <Route path="/trash-can" element={<TrashCanPage />} />
            </Routes>
          </MainContent>
          <Footer />
        </AppContainer>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
