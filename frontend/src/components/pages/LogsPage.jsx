import React, { useState } from 'react';
import styled from 'styled-components';

import { 
  Table, 
  TableBody, 
  Paper, 
  TableHead,
  TableCell as MuiTableCell, 
  TableContainer as MuiTableContainer, 
  TableRow as MuiTableRow, 
  TablePagination as MuiTablePagination,
  Modal,
} from '@mui/material';

import CircleLoader from '../common/CircleLoader';
import ErrorMessage from '../sections/ErrorMessage';
import FilterActions from '../common/FilterActions';
import { useGetAllLogsQuery } from '../../api/apiLogs';
import { formatDate } from '../../utils/formatDate';
import FilterLogsModal from '../modals/FilterLogsModal';
import { useSnackbar } from 'notistack';
import { createSnackbarHandler } from '../../utils/showSnackbar';

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

const LogsPage = () => {
  const [filters, setFilters] = useState({});
  const { data: logs, isLoading, isError } = useGetAllLogsQuery({...filters});

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { enqueueSnackbar } = useSnackbar();
  const handleSnackbar = createSnackbarHandler(enqueueSnackbar);

  const [openFilter, setOpenFilter] = useState(false);
  const handleOpenFilter = () => setOpenFilter(true);
  const handleCloseFilter = () => setOpenFilter(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) return <CircleLoader />;
  if (isError) return <ErrorMessage />;

  const paginatedLogs = logs ? logs.slice(
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
              <StyledTableHeaderCell>Время</StyledTableHeaderCell>
              <StyledTableHeaderCell>Тип</StyledTableHeaderCell>
              <StyledTableHeaderCell>Модуль</StyledTableHeaderCell>
              <StyledTableHeaderCell>Пользователь</StyledTableHeaderCell>
              <StyledTableHeaderCell>Действие</StyledTableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {paginatedLogs.length === 0 ? (
              <TableRow>
                <StyledTableCell colSpan={8} style={{ textAlign: 'center', minHeight: `${10 * 48}px` }}>
                  Тут пока ничего нет
                </StyledTableCell>
              </TableRow>
            ) : (
            paginatedLogs.map((logs) => (
              <TableRow key={logs._id}>
                <StyledTableCell>
                  {formatDate(logs.time)}
                </StyledTableCell>
                <StyledTableCell>
                  <CategoryText>{logs.typeAction}</CategoryText>
                </StyledTableCell><StyledTableCell>
                  {logs.module}
                </StyledTableCell>
                <StyledTableCell>
                  {logs.user}
                </StyledTableCell>
                <StyledTableCell>
                  {logs.action}
                </StyledTableCell>
              </TableRow>
            ))
          )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={logs.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 20]}
          labelRowsPerPage="Строк на странице:"
        />
      </TableContainer>
      <Modal
        disableScrollLock
        open={openFilter}
        onClose={handleCloseFilter}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FilterLogsModal
          handleClose={handleCloseFilter}
          setFilters={setFilters}
          filters={filters}
          handleSnackbar={handleSnackbar}
        />
      </Modal>
    </>
  );
};

export default LogsPage;
