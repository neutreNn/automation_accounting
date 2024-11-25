import React from 'react';
import styled from 'styled-components';
import { useGetAllGearsQuery } from '../api/apiGear';
import CircleLoader from './CircleLoader';
import ErrorMessage from './ErrorMessage';
import InventoryPieChart from './PieChart';
import InventoryLineChart from './InventoryLineChart';

const ChartsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

const ChartsPage = () => {
  const { data: gears, isLoading, isError } = useGetAllGearsQuery();

  if (isLoading) return <CircleLoader />;
  if (isError) return <ErrorMessage />;

  return (
    <ChartsWrapper>
      <InventoryLineChart gears={gears} />
      <InventoryPieChart gears={gears} />
    </ChartsWrapper>
  );
};

export default ChartsPage;
