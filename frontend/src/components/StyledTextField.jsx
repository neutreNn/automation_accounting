﻿import React from 'react';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { TextField as MuiTextField } from '@mui/material';

const CustomTextField = styled(MuiTextField)`
  & .MuiInputBase-root {
    background-color: #161617;
    border: 1px solid #222223;
    border-radius: 5px;
    color: #fff;

    &.Mui-disabled {
      color: #ccc; /* Цвет текста при disabled */
      -webkit-text-fill-color: #ccc; /* Для Safari */
    }
  }

  & .MuiInputLabel-root {
    color: #ccc;

    &.Mui-disabled {
      color: #ccc; /* Цвет лейбла при disabled */
    }
  }

  & .MuiInputBase-input {
    color: #fff;

    &.Mui-disabled {
      color: #ccc; /* Цвет текста внутри инпута */
      -webkit-text-fill-color: #ccc; /* Для Safari */
    }
  }

  & .MuiOutlinedInput-notchedOutline {
    border: 1px solid #222223;

    &.Mui-disabled {
      border-color: #555; /* Цвет границы при disabled */
    }
  }

  & .Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 1px solid #fff;
  }

  & .Mui-error .MuiOutlinedInput-notchedOutline {
    border: 1px solid red;
  }

  & .Mui-error .MuiInputLabel-root {
    color: red;
  }

  & .Mui-error .MuiInputBase-input {
    color: red;
  }
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ErrorMessage = styled.div`
  height: 20px; /* Фиксированная высота для предотвращения увеличения */
  font-size: 12px;
  color: red;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
`;

function StyledTextField({ name, label, requiredText, ...props }) {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext();

  const handleBlur = async () => {
    await trigger(name);
  };

  return (
    <FieldWrapper>
      <CustomTextField
        {...register(name, {
          required: requiredText,
        })}
        label={label}
        variant="outlined"
        size="small"
        error={!!errors[name]}
        onBlur={handleBlur}
        {...props}
      />
      <ErrorMessage visible={!!errors[name]}>{errors[name]?.message}</ErrorMessage>
    </FieldWrapper>
  );
}

export default StyledTextField;
