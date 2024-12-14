import React from 'react';
import styled from 'styled-components';
import { FilterList } from '@mui/icons-material';
import { IconButton as MuiIconButton } from '@mui/material';
import FilterDeleteButton from './FilterDeleteButton';

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
  const handleRemoveFilter = (filterKey) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev };
      delete updatedFilters[filterKey];
      return updatedFilters;
    });
  };

  return (
    <FilterWrapper>
      <IconButton 
        style={{ marginLeft: '8px' }} 
        onClick={handleOpenFilter}
      >
        <FilterList />
      </IconButton>
      <FiltersList>
        {Object.entries(filters).map(([key, value]) => (
          <FilterDeleteButton
            key={key}
            label={key}
            value={value}
            onRemove={() => handleRemoveFilter(key)}
          />
        ))}
      </FiltersList>
    </FilterWrapper>
  );
}

export default FilterActions;
