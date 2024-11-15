import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const HeaderContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid #ccc;
`;

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 40px;
`;

const LogoImage = styled.img`
  height: 40px;
  margin-right: 10px;
`;

const LogoText = styled.h1`
  margin: 0;
  font-size: 18px;
  color: #fff;
`;

const Nav = styled.nav`
  display: flex;
  gap: 40px;
  margin-right: auto;
`;

const NavLink = styled(RouterLink)`
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }
`;

const ExitButton = styled.div`
  background: transparent;
  color: #fff;
  padding: 8px;
  border: 1px solid #fff;
  border-radius: 12px; /* Добавлено скругление углов */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  width: 25px;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8; /* Убираем сдвиг, только уменьшаем прозрачность */
  }
`;

const StyledLogoutIcon = styled(LogoutIcon)`
  color: #fff;
`;

function Header() {
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <LogoContainer>
          <LogoImage src="/logo.png" alt="Логотип" />
          <LogoText>circle.ru</LogoText>
        </LogoContainer>

        <Nav>
          <NavLink to="/">Главная</NavLink>
          <NavLink to="/statistics">Статистика</NavLink>
          <NavLink to="/logs">Логи</NavLink>
        </Nav>

        <ExitButton aria-label="Выход">
          <StyledLogoutIcon />
        </ExitButton>
      </HeaderWrapper>
    </HeaderContainer>
  );
}

export default Header;
