import React from 'react';
import { Typography as MuiTypography } from '@mui/material';
import { PieChart, Pie, Cell } from 'recharts';
import styled from 'styled-components';
import { categoryOptions } from '../constants/categoryOptions';

const StyledTypographyBold = styled(MuiTypography)`
  color: #ffffffcc;
  font-weight: bold;
  margin-bottom: 4px;
`;

const StyledTypographyCaption = styled(MuiTypography)`
  color: #ffffff80;
  font-size: 12px;
`;

const Container = styled.div`
  border: 1px solid #343435;
  border-radius: 20px;
  background-color: #121212;
  padding: 15px;
  width: 320px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 16px;
`;

const ChartWrapper = styled.div`
  background-color: #050505;
  border: 1px solid #343435;
  border-radius: 15px;
  padding: 15px 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChartArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  height: 200px;
`;

const LegendWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
`;

const LegendColorBox = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  margin-right: 6px;
`;

const COLORS = ['#93a0ff', '#5ad2e4', '#a9e8d2', '#626d8a', '#b5b5b5', '#28282a'];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const InventoryPieChart = ({ gears }) => {

  const categoryCounts = categoryOptions.map((option) => ({
    name: option.label,
    value: gears.filter((gear) => gear.category.includes(option.value)).length,
  }));

  const filteredData = categoryCounts.filter((category) => category.value > 0);

  return (
    <Container>
      <Header>
        <StyledTypographyBold variant="body2">Категории инвентаря</StyledTypographyBold>
        <StyledTypographyCaption variant="caption">
          % инвентаря по каждой категории
        </StyledTypographyCaption>
      </Header>
      <ChartWrapper>
        <ChartArea>
          <PieChart width={200} height={200}>
            <Pie
              data={filteredData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              stroke="none"
            >
              {filteredData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ChartArea>
        <LegendWrapper>
          {filteredData.map((entry, index) => (
            <LegendItem key={index}>
              <LegendColorBox color={COLORS[index % COLORS.length]} />
              <MuiTypography variant="caption" sx={{ color: '#fff', fontSize: '12px' }}>
                {entry.name}
              </MuiTypography>
            </LegendItem>
          ))}
        </LegendWrapper>
      </ChartWrapper>
    </Container>
  );
};

export default InventoryPieChart;
