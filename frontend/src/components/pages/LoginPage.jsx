import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';
import StyledTextField from '../common/StyledTextField';
import CustomButton from '../common/CustomButton';
import { useAuthLoginMutation } from '../../api/apiUser';
import { useSnackbar } from 'notistack';
import { createSnackbarHandler } from '../../utils/showSnackbar';
import { snackbarTitles } from '../../constants/snackbarTitles';

const FormContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
  border: 1px solid #343435;
  border-radius: 15px;
  background-color: #121212;
  z-index: 1000;
  width: 100%;
  max-width: 350px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

const LogoImage = styled.img`
  height: 40px;
  margin-bottom: 35px;
`;

const Subtitle = styled(Typography)`
  font-size: 14px;
  color: #b0b0b0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormSectionWrapper = styled.div`
  background-color: #050505;
  border: 1px solid #343435;
  border-radius: 10px 10px 0 0;
  padding: 15px;
`;

const ButtonSectionWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 15px;
  border: 1px solid #343435;
  background-color: #121212;
  background-image: radial-gradient(circle, #2c2c2c 1px, transparent 1px);
  background-size: 10px 10px;
  background-position: center;
  border-radius: 0 0 10px 10px;
`;

function LoginPage() {
  const methods = useForm();
  const [login] = useAuthLoginMutation();

  const { enqueueSnackbar } = useSnackbar();
  const handleSnackbar = createSnackbarHandler(enqueueSnackbar);

  const handleSubmit = (formData) => {
    login(formData)
      .unwrap()
      .then((response) => {
        localStorage.setItem('token', response.token);
        window.location.reload();
      })
      .catch((err) => {
        handleSnackbar(snackbarTitles.loginFailed);
        console.error('Ошибка запроса:', err);
      });
  };

  return (
    <FormContainer>
      <LogoContainer>
        <LogoImage src="/logo.png" alt="Логотип" />
        <Typography variant="h5" component="h1" color="white" gutterBottom>
          Авторизация!
        </Typography>
        <Subtitle variant="body2">
          Пожалуйста, введите ваши данные
        </Subtitle>
      </LogoContainer>
      <FormSectionWrapper>
        <FormProvider {...methods}>
          <Form 
            onSubmit={methods.handleSubmit(handleSubmit)}
            id="login"
            name="login"
          >
            <StyledTextField
              name="email"
              label="Почта"
              requiredText="Почта должна быть заполнена"
            />
            <StyledTextField
              name="password"
              label="Пароль"
              type="password"
              requiredText="Пароль должен быть заполнен"
            />
          </Form>
        </FormProvider>
      </FormSectionWrapper>
      <ButtonSectionWrapper>
        <CustomButton type="submit" form="login">
          <LoginIcon />
          Вход
        </CustomButton>
      </ButtonSectionWrapper>
    </FormContainer>
  );
  
}

export default LoginPage;