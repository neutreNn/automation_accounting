import React, { useState } from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import MuiLogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import { Modal } from '@mui/material';
import AddGear from './AddGear';
import CustomButton from './CustomButton';
import { useSnackbar } from 'notistack';

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

const LogoutIcon = styled(MuiLogoutIcon)`
  color: #fff;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

function Header() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { enqueueSnackbar } = useSnackbar();
  const handleSnackbar = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };

  return (
    <>
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

          <ButtonsContainer>
            <CustomButton onClick={handleOpen}>
              <AddIcon />
            </CustomButton>
            <CustomButton>
              <LogoutIcon />
            </CustomButton>
          </ButtonsContainer>
        </HeaderWrapper>
      </HeaderContainer>
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
        <AddGear handleClose={handleClose} handleSnackbar={handleSnackbar} />
      </Modal>
    </>
  );
}

export default Header;
