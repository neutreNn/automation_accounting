import React from 'react'; 
import { Typography } from '@mui/material';
import { AreaChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Legend, Area, Tooltip } from 'recharts';
import styled from 'styled-components';
import { transformDataLineChart } from '../utils/transformDataLineChart';

const Container = styled.div`
  border: 1px solid #343435;
  border-radius: 20px;
  background-color: #121212;
  padding: 15px;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const Header = styled.div`
  text-align: center;
  margin-bottom: 16px;
`;

const StyledTypographyBold = styled(Typography)`
  color: #ffffffcc;
  font-weight: bold;
  margin-bottom: 4px;
`;

const StyledTypographyCaption = styled(Typography)`
  color: #ffffff80;
  font-size: 12px;
`;

const InventoryLineChart = ({ gears }) => {
  let data = transformDataLineChart(gears);

  return (
    <Container>
      <Header>
        <StyledTypographyBold variant="body2">Ввод/вывод инвентаря</StyledTypographyBold>
        <StyledTypographyCaption variant="caption">
          количество ввода/вывода инвентаря на учёт по годам
        </StyledTypographyCaption>
      </Header>
      <ChartWrapper>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 40,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip 
              formatter={(value, name) => {
                if (name === "uv") {
                  return ["Ввод", value];
                } else if (name === "pv") {
                  return ["Вывод", value];
                }
                return [value, name];
              }}
            />
            <Legend
              formatter={(value) => {
                if (value === "uv") {
                  return "Ввод";
                } else if (value === "pv") {
                  return "Вывод";
                }
                return value;
              }}
            />
            <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
            <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </Container>
  );
};

export default InventoryLineChart;
