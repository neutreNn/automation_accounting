import React from 'react';
import styled from 'styled-components';
import { useFormContext, Controller } from 'react-hook-form';

import { 
  MenuItem, InputLabel, 
  Select as MuiSelect, 
  FormControl as MuiFormControl,
} from '@mui/material';

const CustomFormControl = styled(MuiFormControl)`
  & .MuiInputBase-root {
    background-color: #161617;
    border: 1px solid #222223;
    border-radius: 5px;
    color: #fff;

    &.Mui-disabled {
      color: #ccc;
      -webkit-text-fill-color: #ccc;
      background-color: #1e1e1e;
    }
  }

  & .MuiInputLabel-root {
    color: #ccc;

    &.Mui-disabled {
      color: #888;
    }
  }

  & .MuiOutlinedInput-notchedOutline {
    border: 1px solid #222223;

    &.Mui-disabled {
      border-color: #555;
    }
  }
`;

const CustomSelect = styled(MuiSelect)`
  & .MuiSelect-select {
    background-color: #161617;
    color: #fff;
    padding: 8px;
    display: flex;
    align-items: center;

    &.Mui-disabled {
      color: #ccc;
      -webkit-text-fill-color: #ccc;
      background-color: #1e1e1e;
    }
  }
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ErrorMessage = styled.div`
  height: 20px;
  font-size: 12px;
  color: red;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
`;

function StyledSelectField({ name, label, requiredText, options, ...props }) {
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext();

  const handleBlur = async () => {
    await trigger(name);
  };

  return (
    <FieldWrapper>
      <CustomFormControl variant="outlined" size="small" error={!!errors[name]}>
        <InputLabel>{label}</InputLabel>
        <Controller
          name={name}
          control={control}
          defaultValue=""
          rules={{ required: requiredText}}
          render={({ field }) => (
            <CustomSelect
              {...field}
              label={label}
              onBlur={handleBlur}
              {...props}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </CustomSelect>
          )}
        />
      </CustomFormControl>
      <ErrorMessage visible={!!errors[name]}>{errors[name]?.message}</ErrorMessage>
    </FieldWrapper>
  );
}

export default StyledSelectField;
