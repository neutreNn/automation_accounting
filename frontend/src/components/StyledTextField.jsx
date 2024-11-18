import React from 'react';
import styled from 'styled-components';
import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

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

const CustomTextField = styled(TextField)`
  & .MuiInputBase-root {
    background-color: #161617;
    border: 1px solid #222223;
    border-radius: 5px;
    color: #fff;
  }

  & .MuiInputLabel-root {
    color: #ccc;
  }

  & .MuiInputBase-input {
    color: #fff;
  }

  & .MuiOutlinedInput-notchedOutline {
    border: 1px solid #222223;
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
          required: requiredText || 'Это поле обязательно',
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
