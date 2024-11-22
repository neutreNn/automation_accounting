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
  IconButton as MuiIconButton, 
  TablePagination as MuiTablePagination,
} from '@mui/material';

import { Delete, MoreHoriz } from '@mui/icons-material';

import { useGetAllGearsQuery } from '../api/apiGear';
import CircleLoader from './CircleLoader';
import ErrorMessage from './ErrorMessage';

const IconButton = styled(MuiIconButton)`
  border-radius: 8px;
  background-color: #292929;
  color: white;
  &:hover {
    background-color: #444444;
  }
  .MuiSvgIcon-root {
    color: white;
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
  background-color: ${(props) => (props.isRecent ? '#00FF7F' : '#FF0000')};
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

const GearTable = () => {
  const { data: gears, isLoading, isError } = useGetAllGearsQuery();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) return <CircleLoader />;
  if (isError) return <ErrorMessage />;

  const isRecentDate = (date) => {
    const currentYear = new Date().getFullYear();
    const yearOfOutput = new Date(date).getFullYear();
    return currentYear <= yearOfOutput;
  };

  const paginatedGears = gears.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableHeaderCell>Статус</StyledTableHeaderCell>
              <StyledTableHeaderCell>Название</StyledTableHeaderCell>
              <StyledTableHeaderCell>Категория</StyledTableHeaderCell>
              <StyledTableHeaderCell>Серийный номер</StyledTableHeaderCell>
              <StyledTableHeaderCell>Инвентарный номер</StyledTableHeaderCell>
              <StyledTableHeaderCell>Цена (₽)</StyledTableHeaderCell>
              <StyledTableHeaderCell>Поставщик</StyledTableHeaderCell>
              <StyledTableHeaderCell>Действия</StyledTableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedGears.map((gear) => (
              <TableRow key={gear._id}>
                <StyledTableCell>
                  <StatusLine isRecent={isRecentDate(gear.year_of_output)} />
                </StyledTableCell>
                <StyledTableCell>
                  {gear.name}
                </StyledTableCell>
                <StyledTableCell>
                  <CategoryText>{gear.category}</CategoryText>
                </StyledTableCell>
                <StyledTableCell>
                  {gear.serial_number}
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
                  <IconButton>
                    <MoreHoriz />
                  </IconButton>
                  <IconButton style={{ marginLeft: '8px' }}>
                    <Delete />
                  </IconButton>
                </StyledTableCell>
              </TableRow>
            ))}
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
    </>
  );
};

export default GearTable;
