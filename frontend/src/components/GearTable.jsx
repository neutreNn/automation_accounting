import React from 'react';
import styled from 'styled-components';

import { 
  Table, 
  TableBody, 
  Paper, 
  TableHead, 
  TableCell as MuiTableCell, 
  TableContainer as MuiTableContainer, 
  TableRow as MuiTableRow, 
  IconButton as MuiIconButton
} from '@mui/material';

import { Delete, MoreHoriz } from '@mui/icons-material';

import { useGetAllGearsQuery } from '../api/apiGear';

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

const TableContainer = styled(MuiTableContainer)`
  margin: 20px auto;
  max-width: 1200px;
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
  /* Обрезка текста с многоточием */
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StatusLine = styled.div`
  width: 100%;
  height: 6px;
  border-radius: 5px;
  background-color: ${(props) => (props.isRecent ? '#00FF7F' : '#FF0000')};
`;

const GearTable = () => {
  const { data: gears, isLoading, isError } = useGetAllGearsQuery();

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка загрузки данных</p>;

  const isRecentDate = (date) => new Date(date) >= new Date('2024-10-15');

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableHeaderCell>Статус</StyledTableHeaderCell>
            <StyledTableHeaderCell>Название</StyledTableHeaderCell>
            <StyledTableHeaderCell>Категория</StyledTableHeaderCell>
            <StyledTableHeaderCell>Серийный номер</StyledTableHeaderCell>
            <StyledTableHeaderCell>Дата выдачи</StyledTableHeaderCell>
            <StyledTableHeaderCell>Цена (₽)</StyledTableHeaderCell>
            <StyledTableHeaderCell>Поставщик</StyledTableHeaderCell>
            <StyledTableHeaderCell>Действия</StyledTableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gears.map((gear) => (
            <TableRow key={gear._id}>
              <StyledTableCell>
                <StatusLine isRecent={isRecentDate(gear.date_of_issue)} />
              </StyledTableCell>
              <StyledTableCell>{gear.name}</StyledTableCell>
              <StyledTableCell>{gear.category}</StyledTableCell>
              <StyledTableCell>{gear.serial_number}</StyledTableCell>
              <StyledTableCell>{gear.date_of_issue}</StyledTableCell>
              <StyledTableCell>{gear.price}</StyledTableCell>
              <StyledTableCell>{gear.supplier}</StyledTableCell>
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
    </TableContainer>
  );
};

export default GearTable;
