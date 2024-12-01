import React from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';

const HistoryWrapper = styled.div`
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

const HistoryItem = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #343435;
  border-radius: 5px;
  background-color: #121212;
`;

const HistorySection = ({ history }) => {
  return (
    <HistoryWrapper>
      <Typography variant="h6" color="white" gutterBottom>
        История инвентаря
      </Typography>
      {history && history.length > 0 ? (
        history.map((entry, index) => (
          <HistoryItem key={index}>
            <Typography variant="body2" color="white">
              <strong>{entry.date}:</strong> {entry.fio} - {entry.action}
            </Typography>       
          </HistoryItem>
        ))
      ) : (
        <Typography variant="body2" color="gray">
          История пуста.
        </Typography>
      )}
    </HistoryWrapper>
  );
};

export default HistorySection;
