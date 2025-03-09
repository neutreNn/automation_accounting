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

import { Delete } from '@mui/icons-material';

import { createSnackbarHandler } from '../../utils/showSnackbar';
import CircleLoader from '../common/CircleLoader';
import ErrorMessage from '../sections/ErrorMessage';
import FilterWorkerModal from '../modals/FilterWorkerModal';
import FilterActions from '../common/FilterActions';
import { useGetAllWorkersQuery } from '../../api/apiWorker';
import WorkersDetailsModal from '../modals/WorkersDetailsModal';
import DeleteWorkerModal from '../modals/DeleteWorkerModal';
import { formatDate } from '../../utils/formatDate';

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

const WorkersPage = () => {
  const [filters, setFilters] = useState({});
  const { data: workers, isLoading, isError } = useGetAllWorkersQuery({...filters});

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openWorkerDetails, setOpenWorkerDetails] = useState(false);
  const handleOpenWorkerDetails = () => setOpenWorkerDetails(true);
  const handlecloseWorkerDetails = () => setOpenWorkerDetails(false);

  const [openFilter, setOpenFilter] = useState(false);
  const handleOpenFilter = () => setOpenFilter(true);
  const handleCloseFilter = () => setOpenFilter(false);

  const [openWorkerDelete, setOpenWorkerDelete] = useState(false);
  const handleOpenDeleteWorker = () => setOpenWorkerDelete(true);
  const handleCloseDeleteWorker = () => setOpenWorkerDelete(false);

  const [selectedWorker, setSelectedWorker] = useState({});

  const handleRowClick = (worker) => {
    setSelectedWorker(worker);
    handleOpenWorkerDetails();
  };
  
  const { enqueueSnackbar } = useSnackbar();
  const handleSnackbar = createSnackbarHandler(enqueueSnackbar);

  const handleRemoveClick = (worker) => {
    setSelectedWorker(worker);
    handleOpenDeleteWorker();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) return <CircleLoader />;
  if (isError) return <ErrorMessage />;

  const paginatedWorkers = workers ? workers.slice(
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
              <StyledTableHeaderCell>ФИО</StyledTableHeaderCell>
              <StyledTableHeaderCell>Табельный номер</StyledTableHeaderCell>
              <StyledTableHeaderCell>Дата рождения</StyledTableHeaderCell>
              <StyledTableHeaderCell>Паспорт</StyledTableHeaderCell>
              <StyledTableHeaderCell>Номер телефона</StyledTableHeaderCell>
              <StyledTableHeaderCell>Должность</StyledTableHeaderCell>
              <StyledTableHeaderCell>Действия</StyledTableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {paginatedWorkers.length === 0 ? (
              <TableRow>
                <StyledTableCell colSpan={8} style={{ textAlign: 'center', minHeight: `${10 * 48}px` }}>
                  Тут пока ничего нет
                </StyledTableCell>
              </TableRow>
            ) : (
            paginatedWorkers.map((worker) => (
              <TableRow key={worker._id} onClick={() => handleRowClick(worker)}>
                <StyledTableCell>
                  {worker.fio}
                </StyledTableCell>
                <StyledTableCell>
                  <CategoryText>{worker.employee_number}</CategoryText>
                </StyledTableCell>
                <StyledTableCell>
                  {formatDate(worker.date_of_birth, true)}
                </StyledTableCell>
                <StyledTableCell>
                  {worker.passport}
                </StyledTableCell>
                <StyledTableCell>
                  {worker.phone_number}
                </StyledTableCell>
                <StyledTableCell>
                  {worker.post}
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton 
                    style={{ marginLeft: '8px' }} 
                    onClick={(event) => {
                      event.stopPropagation();
                      handleRemoveClick(worker);
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
          count={workers.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 20]}
          labelRowsPerPage="Строк на странице:"
        />
      </TableContainer>
      <Modal
        open={openWorkerDetails}
        onClose={handlecloseWorkerDetails}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <WorkersDetailsModal
          handleClose={handlecloseWorkerDetails} 
          selectedWorker={selectedWorker.employee_number}
          handleSnackbar={handleSnackbar}
        />
      </Modal>
      <Modal
        open={openFilter}
        onClose={handleCloseFilter}
        aria-labelledby="modal-modal-title4"
        aria-describedby="modal-modal-description4"
      >
        <FilterWorkerModal
          handleClose={handleCloseFilter}
          setFilters={setFilters}
          filters={filters}
          handleSnackbar={handleSnackbar}
        />
      </Modal>
      <Modal
        open={openWorkerDelete}
        onClose={handleCloseDeleteWorker}
        aria-labelledby="modal-modal-title2"
        aria-describedby="modal-modal-description2"
      >
        <DeleteWorkerModal
          handleClose={handleCloseDeleteWorker} 
          selectedWorker={selectedWorker} 
          handleSnackbar={handleSnackbar}
        />
      </Modal>
    </>
  );
};

export default WorkersPage;
