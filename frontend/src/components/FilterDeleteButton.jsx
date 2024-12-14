import React from 'react';
import styled from 'styled-components';
import { Close } from '@mui/icons-material';
import { IconButton as MuiIconButton } from '@mui/material';

const FilterBlock = styled.div`
  background-color: #292929;
  color: white;
  padding-left: 10px;
  border-radius: 25px;
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  box-sizing: border-box;
`;

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

const labelMap = {
  category: 'Категория',
  name: 'Название',
  serial_number: 'Серийный номер',
  inventory_number: 'Инвентарный номер',
  supplier: 'Поставщик',
  price: 'Цена',
  year_of_release: 'Год выпуска',
  year_of_input: 'Год ввода',
  year_of_output: 'Год вывода',
  available: 'Доступность',
};

function FilterDeleteButton({ label, value, onRemove }) {
  const formatValue = () => {
    if (Array.isArray(value)) {
      return `от ${value[0]} до ${value[1]}`;
    }
    return value;
  };

  const translatedLabel = labelMap[label] || label;

  return (
    <FilterBlock>
      {translatedLabel}: {formatValue()}
      <IconButton onClick={onRemove} style={{ marginLeft: '8px' }}>
        <Close fontSize="small" />
      </IconButton>
    </FilterBlock>
  );
}

export default FilterDeleteButton;
