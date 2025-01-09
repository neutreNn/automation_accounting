import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

const ProtectedRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? 
    <AppContainer>
      <Header />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </AppContainer>
  : 
    <Navigate to="/" />;
};

export default ProtectedRoute;
