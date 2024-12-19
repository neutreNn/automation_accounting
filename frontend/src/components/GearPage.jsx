import React, { useState } from 'react';
import styled from 'styled-components';
import { useSnackbar } from 'notistack';

import { 
  Table, 
  TableBody, 
  Paper, 
  TableHead,
  Modal,
  TableCell as MuiTableCell, 
  TableContainer as MuiTableContainer, 
  TableRow as MuiTableRow, 
  IconButton as MuiIconButton, 
  TablePagination as MuiTablePagination,
} from '@mui/material';

import { Delete, Done, Close, QrCode } from '@mui/icons-material';

import { useGetAllGearsQuery, useUpdateGearMutation } from '../api/apiGear';
import { snackbarTitles } from '../constants/snackbarTitles';
import { createSnackbarHandler } from '../utils/showSnackbar';
import CircleLoader from './CircleLoader';
import ErrorMessage from './ErrorMessage';
import GearDetailsModal from './GearDetailsModal';
import StatusChangeModal from './StatusChangeModal';
import BarcodeGenerator from './BarcodeGenerator';
import FilterModal from './FilterModal';
import FilterActions from './FilterActions';

const IconButton = styled(MuiIconButton)`
  border-radius: 8px;
  background-color: #292929;
  transition: background-color 0.3s ease;
  .MuiSvgIcon-root {
    color: white;
  }
  &.MuiButtonBase-root {
    &:hover {
      background-color: #626d8a;
    }
  }
`;

const TablePagination = styled(MuiTablePagination)`
  color: white !important;
  font-weight: bold;
  background-color: #161b22;

  .MuiTablePagination-actions .Mui-disabled {
    color: rgba(255, 255, 255, 0.5) !important;
  }

  .MuiTablePagination-selectIcon {
    color: #fff;
  }
`;

const TableContainer = styled(MuiTableContainer)`
  margin: 20px auto;
  max-width: 1300px;
  border-radius: 8px;
  border: 1px solid #444444;
  background-color: #0d1117;
`;

const StyledTableHeaderCell = styled(MuiTableCell)`
  color: white !important;
  font-weight: bold;
  background-color: #161b22;
  text-align: center;
  border-bottom: 1px solid #444444;
`;

const TableRow = styled(MuiTableRow)`
  &:nth-of-type(odd) {
    background-color: #1c2128;
  }
  &:nth-of-type(even) {
    background-color: #0d1117;
  }
  &:hover {
    background-color: #2d333b;
    cursor: pointer;
  }
`;

const StyledTableCell = styled(MuiTableCell)`
  color: white !important;
  border-bottom: 1px solid #444444;
  display: flex;
  align-items: center;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0;
`;

const StatusLine = styled.div`
  width: 100%;
  height: 6px;
  border-radius: 5px;
  background-color: ${(props) => (props.isAvailable ? '#00FF7F' : '#FF0000')};
`;

const CategoryText = styled.div`
  background-color: #626d8a;
  color: #fff;
  padding: 2px 10px;
  border-radius: 12px;
  display: inline-block;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
`;

const GearPage = () => {
  const [filters, setFilters] = useState({});
  const { data: gears, isLoading, isError } = useGetAllGearsQuery({
    trashCan: false,
    ...filters,
  });

  const [updateGear] = useUpdateGearMutation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openGearDetails, setOpenGearDetails] = useState(false);
  const handleOpenGearDetails = () => setOpenGearDetails(true);
  const handlecloseGearDetails = () => setOpenGearDetails(false);

  const [openStatusChange, setOpenStatusChange] = useState(false);
  const handleOpenStatusChange = () => setOpenStatusChange(true);
  const handleCloseStatusChange = () => setOpenStatusChange(false);

  const [openBarcode, setOpenBarcode] = useState(false);
  const handleOpenBarcode = () => setOpenBarcode(true);
  const handleCloseBarcode = () => setOpenBarcode(false);

  const [openFilter, setOpenFilter] = useState(false);
  const handleOpenFilter = () => setOpenFilter(true);
  const handleCloseFilter = () => setOpenFilter(false);

  const [selectedGear, setSelectedGear] = useState({});

  const handleBarcodeClick = (gear) => {
    setSelectedGear(gear);
    handleOpenBarcode();
  };

  const handleStatusChangeClick = (gear) => {
    setSelectedGear(gear);
    handleOpenStatusChange();
  };

  const handleAddTrashCan = (gear) => {
    updateGear({
      id: gear._id,
      trashCan: !gear.trashCan,
    })
      .unwrap()
      .then(() => {
        handleSnackbar(snackbarTitles.trashAdded);
      })
      .catch((err) => {
        handleSnackbar(snackbarTitles.trashAddFailed);
        console.error('Ошибка запроса:', err);
      });
  };

  const handleRowClick = (gear) => {
    setSelectedGear(gear);
    handleOpenGearDetails();
  };
  
  const { enqueueSnackbar } = useSnackbar();
  const handleSnackbar = createSnackbarHandler(enqueueSnackbar);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) return <CircleLoader />;
  if (isError) return <ErrorMessage />;

  const paginatedGears = gears ? gears.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  ) : [];

  return (
    <>
      <TableContainer component={Paper}>
        <FilterActions handleOpenFilter={handleOpenFilter} filters={filters} setFilters={setFilters} />
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableHeaderCell>Статус</StyledTableHeaderCell>
              <StyledTableHeaderCell>Название</StyledTableHeaderCell>
              <StyledTableHeaderCell>Категория</StyledTableHeaderCell>
              <StyledTableHeaderCell>Год ввода</StyledTableHeaderCell>
              <StyledTableHeaderCell>Инвентарный номер</StyledTableHeaderCell>
              <StyledTableHeaderCell>Цена (₽)</StyledTableHeaderCell>
              <StyledTableHeaderCell>Поставщик</StyledTableHeaderCell>
              <StyledTableHeaderCell>Действия</StyledTableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {paginatedGears.length === 0 ? (
              <TableRow>
                <StyledTableCell colSpan={8} style={{ textAlign: 'center', minHeight: `${10 * 48}px` }}>
                  Тут пока ничего нет
                </StyledTableCell>
              </TableRow>
            ) : (
            paginatedGears.map((gear) => (
              <TableRow key={gear._id} onClick={() => handleRowClick(gear)}>
                <StyledTableCell>
                  <StatusLine isAvailable={gear.available} />
                </StyledTableCell>
                <StyledTableCell>
                  {gear.name}
                </StyledTableCell>
                <StyledTableCell>
                  <CategoryText>{gear.category}</CategoryText>
                </StyledTableCell>
                <StyledTableCell>
                  {gear.year_of_input}
                </StyledTableCell>
                <StyledTableCell>
                  {gear.inventory_number}
                </StyledTableCell>
                <StyledTableCell>
                  {gear.price}
                </StyledTableCell>
                <StyledTableCell>
                  {gear.supplier}
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton 
                      style={{ marginLeft: '8px' }} 
                      onClick={(event) => {
                        event.stopPropagation();
                        handleStatusChangeClick(gear);
                        } 
                      }
                  >
                    {gear.available ? <Done /> : <Close />}
                  </IconButton>
                  <IconButton 
                      style={{ marginLeft: '8px' }} 
                      onClick={(event) => {
                        event.stopPropagation();
                        handleBarcodeClick(gear)
                        } 
                      }
                  >
                    <QrCode />
                  </IconButton>
                  <IconButton 
                    style={{ marginLeft: '8px' }} 
                    onClick={(event) => {
                      event.stopPropagation();
                      handleAddTrashCan(gear);
                      } 
                    }
                  >
                    <Delete />
                  </IconButton>
                </StyledTableCell>
              </TableRow>
            ))
          )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={gears.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 20]}
          labelRowsPerPage="Строк на странице:"
        />
      </TableContainer>
      <Modal
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
      <Modal
        open={openStatusChange}
        onClose={handleCloseStatusChange}
        aria-labelledby="modal-modal-title2"
        aria-describedby="modal-modal-description2"
      >
        <StatusChangeModal 
          handleClose={handleCloseStatusChange} 
          selectedGear={selectedGear._id}
          availableStatus={selectedGear.available}
          gearHistory={selectedGear.history}
          handleSnackbar={handleSnackbar} 
        />
      </Modal>
      <Modal
        open={openBarcode}
        onClose={handleCloseBarcode}
        aria-labelledby="modal-modal-title3"
        aria-describedby="modal-modal-description3"
      >
        <BarcodeGenerator
          handleClose={handleCloseBarcode}
          selectedGear={selectedGear.serial_number}
        />
      </Modal>
      <Modal
        open={openFilter}
        onClose={handleCloseFilter}
        aria-labelledby="modal-modal-title4"
        aria-describedby="modal-modal-description4"
      >
        <FilterModal
          handleClose={handleCloseFilter}
          setFilters={setFilters}
          filters={filters}
          handleSnackbar={handleSnackbar}
        />
      </Modal>
    </>
  );
};

export default GearPage;
