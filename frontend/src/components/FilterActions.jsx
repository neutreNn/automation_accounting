import React from 'react';
import styled from 'styled-components';
import { FilterList } from '@mui/icons-material';
import { Close } from '@mui/icons-material';
import { IconButton as MuiIconButton } from '@mui/material';

const FilterWrapper = styled.div`
  background-color: #161b22;
  padding: 10px;
  display: flex;
  align-items: center;
`;

const FiltersList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-left: 8px;
`;

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

function FilterActions({ filters, setFilters, handleOpenFilter }) {
  const handleRemoveFilter = (filter) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev };
      delete updatedFilters[filter];
      return updatedFilters;
    });
  };

  return (
    <FilterWrapper>
      <IconButton 
        style={{ marginLeft: '8px' }} 
        onClick={() => {
          handleOpenFilter();
        }}
      >
        <FilterList />
      </IconButton>
      <FiltersList>
        {filters.price && (
          <FilterBlock>
            Цена: от {filters.price[0]} до {filters.price[1]}
            <IconButton
              style={{ marginLeft: '8px' }}
              onClick={() => handleRemoveFilter('price')}
            >
              <Close fontSize="small" />
            </IconButton>
          </FilterBlock>
        )}
        {filters.year_of_input && (
          <FilterBlock>
            Ввод: от {filters.year_of_input[0]} до {filters.year_of_input[1]}
            <IconButton
              style={{ marginLeft: '8px' }}
              onClick={() => handleRemoveFilter('year_of_input')}
            >
              <Close fontSize="small" />
            </IconButton>
          </FilterBlock>
        )}
        {filters.year_of_output && (
          <FilterBlock>
            Вывод: от {filters.year_of_output[0]} до {filters.year_of_output[1]}
            <IconButton
              style={{ marginLeft: '8px' }}
              onClick={() => handleRemoveFilter('year_of_output')}
            >
              <Close fontSize="small" />
            </IconButton>
          </FilterBlock>
        )}
        {filters.year_of_release && (
          <FilterBlock>
            Выпуск: от {filters.year_of_release[0]} до {filters.year_of_release[1]}
            <IconButton
              style={{ marginLeft: '8px' }}
              onClick={() => handleRemoveFilter('year_of_release')}
            >
              <Close fontSize="small" />
            </IconButton>
          </FilterBlock>
        )}
        {filters.category && (
          <FilterBlock>
            Категория: {filters.category}
            <IconButton
              onClick={() => handleRemoveFilter('category')}
            >
              <Close fontSize="small" />
            </IconButton>
          </FilterBlock>
        )}
        {filters.name && (
          <FilterBlock>
            Название: {filters.name}
            <IconButton
              onClick={() => handleRemoveFilter('name')}
            >
              <Close fontSize="small" />
            </IconButton>
          </FilterBlock>
        )}
        {filters.serial_number && (
          <FilterBlock>
            Серийный номер: {filters.serial_number}
            <IconButton
              onClick={() => handleRemoveFilter('serial_number')}
            >
              <Close fontSize="small" />
            </IconButton>
          </FilterBlock>
        )}
        {filters.supplier && (
          <FilterBlock>
            Поставщик: {filters.supplier}
            <IconButton
              onClick={() => handleRemoveFilter('supplier')}
            >
              <Close fontSize="small" />
            </IconButton>
          </FilterBlock>
        )}
      </FiltersList>
    </FilterWrapper>
  );
}

export default FilterActions;
