import React from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';

const InventoryWrapper = styled.div`
  flex: 1;
  background-color: #050505;
  border: 1px solid #343435;
  border-radius: 10px;
  padding: 15px;
  overflow-y: auto;
  max-height: 400px;

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const InventoryItem = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #343435;
  border-radius: 5px;
  background-color: #121212;
`;

const InventorySection = ({ inventory }) => {
  return (
    <InventoryWrapper>
      <Typography variant="h6" color="white" gutterBottom>
        Инвентарь на учёте
      </Typography>
      {inventory && inventory.length > 0 ? (
        inventory.map((item, index) => (
          <InventoryItem key={index}>
            <Typography variant="body2" color="white">
              <strong>{item.name}</strong> Инв. номер - {item.inventory_number}
            </Typography>
          </InventoryItem>
        ))
      ) : (
        <Typography variant="body2" color="gray">
          Инвентарь отсутствует.
        </Typography>
      )}
    </InventoryWrapper>
  );
};

export default InventorySection;
