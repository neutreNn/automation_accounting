import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import GearTable from './components/GearTable';
import styled from 'styled-components';
import { SnackbarProvider } from 'notistack'

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
              <Route path="/" element={<GearTable />} />
              <Route path="/statistics" element={<p>Статистика</p>} />
              <Route path="/logs" element={<p>Логи</p>} />
            </Routes>
          </MainContent>
          <Footer />
        </AppContainer>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
