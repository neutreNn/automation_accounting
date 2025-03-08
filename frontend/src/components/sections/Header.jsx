import React, { useState } from 'react';
import styled from 'styled-components';
import { useSnackbar } from 'notistack';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Modal } from '@mui/material';

import { 
  Delete as DeleteIcon, 
  Inventory as InventoryIcon, 
  Insights as InsightsIcon, 
  Dvr as DvrIcon, 
  Logout as MuiLogoutIcon, 
  Add as AddIcon, 
  Person as PersonIcon,
  CropFree as CropFreeIcon,
} from '@mui/icons-material';

import { createSnackbarHandler } from '../../utils/showSnackbar';
import AddGear from '../modals/AddGear';
import CustomButton from '../common/CustomButton';
import AddWorker from '../modals/AddWorker';
import BarcodeScannerModal from '../modals/BarcodeScannerModal';
import GearDetailsModal from '../modals/GearDetailsModal';

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
  align-items: center;
`;

const NavLinkContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

function Header() {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [openModalScan, setOpenModalScan] = useState(false);
  const handleOpenScanModal = () => setOpenModalScan(true);
  const handleCloseScanModal = () => setOpenModalScan(false);

  const [openGearDetails, setOpenGearDetails] = useState(false);
  const handleOpenGearDetails = () => setOpenGearDetails(true);
  const handlecloseGearDetails = () => setOpenGearDetails(false);

  const [selectedGear, setSelectedGear] = useState({});

  const handleBarcodeDetected = (code) => {
    setSelectedGear({ _id: code });
    handleOpenGearDetails()
  };

  const { enqueueSnackbar } = useSnackbar();
  const handleSnackbar = createSnackbarHandler(enqueueSnackbar);

  const location = useLocation();

  const getModalContent = () => {
    switch (location.pathname) {
      case '/gears':
        return <AddGear handleClose={handleCloseModal} handleSnackbar={handleSnackbar} />;
      case '/workers':
        return <AddWorker handleClose={handleCloseModal} handleSnackbar={handleSnackbar} />;
      default:
        return <div>Нет доступного модального окна для данного пути</div>;
    }
  };

  const isAddButtonVisible = location.pathname === '/gears' || location.pathname === '/workers';

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
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
            <NavLink to="/gears">
              <NavLinkContent>
                <InventoryIcon />
                Инвентарь
              </NavLinkContent>
            </NavLink>
            <NavLink to="/workers">
              <NavLinkContent>
                <PersonIcon />
                Сотрудники
              </NavLinkContent>
            </NavLink>
            <NavLink to="/statistics">
              <NavLinkContent>
                <InsightsIcon />
                Статистика
              </NavLinkContent>
            </NavLink>
            <NavLink to="/logs">
              <NavLinkContent>
                <DvrIcon />
                Логи
              </NavLinkContent>
            </NavLink>
            <NavLink to="/trash-can">
              <NavLinkContent>
                <DeleteIcon />
                Корзина
              </NavLinkContent>
            </NavLink>
          </Nav>

          <ButtonsContainer>
            {isAddButtonVisible && (
              <CustomButton onClick={handleOpenModal}>
                <AddIcon />
              </CustomButton>
            )}
            <CustomButton onClick={handleOpenScanModal}>
              <CropFreeIcon/>
            </CustomButton>
            <CustomButton onClick={handleLogout}>
              <LogoutIcon />
            </CustomButton>
          </ButtonsContainer>
        </HeaderWrapper>
      </HeaderContainer>
      <Modal
        disableScrollLock
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {getModalContent()}
      </Modal>
      <Modal
        disableScrollLock
        open={openModalScan}
        onClose={handleCloseScanModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <BarcodeScannerModal handleCloseScanModal={handleCloseScanModal} onDetected={handleBarcodeDetected} handleSnackbar={handleSnackbar}/>
      </Modal>
      <Modal
        disableScrollLock
        open={openGearDetails}
        onClose={handlecloseGearDetails}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <GearDetailsModal
          handleClose={handlecloseGearDetails} 
          selectedGear={selectedGear._id} 
          handleSnackbar={handleSnackbar}
        />
      </Modal>
    </>
  );
}

export default Header;
