import React from 'react';
import styled from 'styled-components';
import { useGetAllGearsQuery } from '../api/apiGear';
import CircleLoader from './CircleLoader';
import ErrorMessage from './ErrorMessage';
import InventoryPieChart from './PieChart';

const ChartsPage = () => {
  const { data: gears, isLoading, isError } = useGetAllGearsQuery();

  if (isLoading) return <CircleLoader />;
  if (isError) return <ErrorMessage />;

  return (
    <>
    <InventoryPieChart gears={gears} />
    </>
  );
};

export default ChartsPage;
