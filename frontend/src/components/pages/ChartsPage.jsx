import React from 'react';
import styled from 'styled-components';
import { useGetAllGearsQuery } from '../../api/apiGear';
import CircleLoader from '../common/CircleLoader';
import ErrorMessage from '../sections/ErrorMessage';
import InventoryPieChart from '../sections/PieChart';
import InventoryLineChart from '../sections/InventoryLineChart';

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
