import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Container as MuiContainer, Typography } from '@mui/material';
import { Add as AddIcon, ArrowBackIos as ArrowBackIosIcon } from '@mui/icons-material';
import StyledTextField from './StyledTextField';
import CustomButton from './CustomButton';
import { snackbarTitles } from '../constants/snackbarTitles';
import { useCreateWorkerMutation } from '../api/apiWorker';

const FormContainer = styled(MuiContainer)`
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
  max-width: 600px;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
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

function AddWorker({handleClose, handleSnackbar}) {
  const methods = useForm();
  const [createWorker] = useCreateWorkerMutation();

  const handleSubmit = (formData) => {
    createWorker(formData)
      .unwrap()
      .then(() => {
        handleSnackbar(snackbarTitles.workerAdded);
        handleClose();
      })
      .catch((err) => {
        handleSnackbar(snackbarTitles.workerAddFailed);
        console.error('Ошибка запроса:', err);
      });
  };

  return (
    <FormContainer maxWidth="sm">
      <Typography variant="h5" component="h1" color="white" gutterBottom>
        Добавить сотрудника
      </Typography>
      <FormSectionWrapper>
        <FormProvider {...methods}>
          <Form 
            onSubmit={methods.handleSubmit(handleSubmit)}
            id="add-worker"
            name="add-worker"
          >
            <StyledTextField
              name="fio"
              label="ФИО"
              requiredText="ФИО должно быть заполнено"
            />
            <StyledTextField
                name="date_of_birth"
                label="Дата рождения"
                requiredText="Серийный номер должен быть указан"
            />
            <Row>
              <StyledTextField
                name="employee_number"
                label="Табельный номер"
                requiredText="Табельный номер должен быть указан"
              />
              <StyledTextField
                name="passport"
                label="Паспорт"
                requiredText="Паспорт должен быть указан"
              />
            </Row>

            <Row>
              <StyledTextField
                name="inn_number"
                label="ИНН"
                requiredText="ИНН должен быть указан"
              />
              <StyledTextField
                name="phone_number"
                label="Номер телефона"
                requiredText="Номер телефона должен быть указан"
              />
            </Row>
            <StyledTextField
              name="post"
              label="Должность"
              requiredText="Должность должна быть указана"
            />
          </Form>
        </FormProvider>
      </FormSectionWrapper>
      <ButtonSectionWrapper>
        <CustomButton onClick={handleClose}>
          <ArrowBackIosIcon />
          Назад
        </CustomButton>
        <CustomButton type="submit" form="add-worker">
          <AddIcon />
          Добавить
        </CustomButton>
      </ButtonSectionWrapper>
    </FormContainer>
  );
}

export default AddWorker;