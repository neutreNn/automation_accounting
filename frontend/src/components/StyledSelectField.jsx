import React from 'react';
import styled from 'styled-components';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

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

const CustomFormControl = styled(FormControl)`
  & .MuiInputBase-root {
    background-color: #161617;
    border: 1px solid #222223;
    border-radius: 5px;
    color: #fff;
  }

  & .MuiInputLabel-root {
    color: #ccc;
  }

  & .MuiInputLabel-shrink {
    color: #fff;
  }

  & .MuiOutlinedInput-notchedOutline {
    border: 1px solid #222223;
  }

  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 1px solid #fff;
  }

  & .MuiSvgIcon-root {
    color: #fff;
  }
`;

const CustomSelect = styled(Select)`
  & .MuiSelect-select {
    background-color: #161617;
    color: #fff;
    padding: 8px;
    display: flex;
    align-items: center;
  }
`;

function StyledSelect({ name, label, requiredText, options, ...props }) {
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
          rules={{ required: requiredText || 'Это поле обязательно' }}
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

export default StyledSelect;
