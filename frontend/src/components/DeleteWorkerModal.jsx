import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FormProvider, useForm } from 'react-hook-form';
import { DeleteForever as DeleteForeverIcon, ArrowBackIos as ArrowBackIosIcon } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Container as MuiContaine } from '@mui/system';
import { snackbarTitles } from '../constants/snackbarTitles';
import StyledTextField from './StyledTextField';
import CustomButton from './CustomButton';
import { useRemoveWorkerMutation } from '../api/apiWorker';

const FormContainer = styled(MuiContaine)`
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

const DeleteWorkerModal = ({ handleSnackbar, handleClose, selectedWorker }) => {
  const methods = useForm();
  const [removeWorker] = useRemoveWorkerMutation();

  useEffect(() => {
    methods.reset({
      fio: selectedWorker.fio,
      employee_number: selectedWorker.employee_number,
      passport: selectedWorker.passport,
      post: selectedWorker.post,
    });
  }, []);


  const handleSubmit = () => {
    removeWorker(selectedWorker.employee_number)
      .unwrap()
      .then(() => {
        handleSnackbar(snackbarTitles.workerDeleted);
        handleClose();
      })
      .catch((err) => {
        handleSnackbar(snackbarTitles.workerDeleteFailed);
        console.error('Ошибка запроса:', err);
      });
  };

  return (
    <FormContainer maxWidth="sm">
      <Typography variant="h5" component="h1" color="white" gutterBottom>
        Уверенны что хотите удалить сотрудника?
      </Typography>
      <FormSectionWrapper>
        <FormProvider {...methods}>
          <Form 
            onSubmit={methods.handleSubmit(handleSubmit)}
            id="delete-worker"
            name="delete-worker"
          >
            <StyledTextField
                name="fio"
                label="ФИО"
                disabled
            />
            <StyledTextField
              name="employee_number"
              label="Табельный номер"
              disabled
            />
            <StyledTextField
              name="passport"
              label="Паспорт"
              disabled
            />
            <StyledTextField
              name="post"
              label="Должность"
              disabled
            />
          </Form>
        </FormProvider>
      </FormSectionWrapper>
      <ButtonSectionWrapper>
        <CustomButton onClick={handleClose}>
          <ArrowBackIosIcon />
          Назад
        </CustomButton>
        <CustomButton type="submit" form="delete-worker">
          <DeleteForeverIcon />
          Удалить
        </CustomButton>
      </ButtonSectionWrapper>
    </FormContainer>
  );
};

export default DeleteWorkerModal;
