import React from 'react';
import styled from 'styled-components';
import { Typography, Slider } from '@mui/material';
import { Box } from '@mui/system';
import { useController, useFormContext } from 'react-hook-form';

const StyledSliderWrapper = styled(Box)`
  & .MuiSlider-root {
    color: white;
  }

  & .MuiSlider-thumb {
    background-color: white;
  }

  & .MuiSlider-track {
    background-color: white;
  }

  & .MuiSlider-rail {
    background-color: #2c2c2c;
  }
`;

function StyledSlider({ name, label, minValue = 0, maxValue, interval = 1, ...props }) {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    defaultValue: [minValue, maxValue],
  });

  return (
    <StyledSliderWrapper>
      <Typography variant="body1" color="white">
        {label}
      </Typography>
      <Slider
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
        min={minValue}
        max={maxValue}
        valueLabelDisplay="auto"
        step={interval}
        {...props}
      />
    </StyledSliderWrapper>
  );
}

export default StyledSlider;
