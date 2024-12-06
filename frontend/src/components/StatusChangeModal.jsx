import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import StyledTextField from './StyledTextField';
import { FormProvider, useForm } from 'react-hook-form';
import { useUpdateGearMutation } from '../api/apiGear';
import { Container } from '@mui/system';
import CustomButton from './CustomButton';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const FormContainer = styled(Container)`
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

const StatusChangeModal = ({ handleSnackbar, handleClose, selectedGear, availableStatus }) => {
  const methods = useForm();
  const [updateGear] = useUpdateGearMutation();

  useEffect(() => {
    const today = new Date();
    const formattedDate = today
      .toLocaleString('ru-RU', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
      })
      .replace(',', '');
    methods.reset({
      date_of_action: formattedDate,
      fio: '',
      employee_number: '',
      action: availableStatus ? 'Взял' : 'Вернул',
    });
  }, [methods]);

  const handleSubmit = (formData) => {
    updateGear({id: selectedGear, ...formData })
      .unwrap()
      .then(() => {
        handleSnackbar(`Статус инвентаря изменён`, "success");
        handleClose();
      })
      .catch((err) => {
        handleSnackbar("Не удалось изменить статус инвентаря", "error");
        console.error('Ошибка запроса:', err);
      });
  };

  return (
    <FormContainer maxWidth="sm">
      <Typography variant="h5" component="h1" color="white" gutterBottom>
        Статус инвентаря
      </Typography>
      <FormSectionWrapper>
        <FormProvider {...methods}>
          <Form 
            onSubmit={methods.handleSubmit(handleSubmit)}
            id="add-gear"
            name="add-gear"
          >
            <StyledTextField
                name="date_of_action"
                label="Дата действия"
                requiredText="Дата действия должно быть указано"
                disabled
            />
            <StyledTextField
              name="action"
              label="Действие"
              requiredText="Действие должно быть выбрано"
              disabled
            />
            <StyledTextField
              name="fio"
              label="ФИО"
              requiredText="ФИО должно быть заполнено"
            />
            <StyledTextField
              name="employee_number"
              label="Табельный номер"
              requiredText="Табельный номер должен быть выбран"
            />
          </Form>
        </FormProvider>
      </FormSectionWrapper>
      <ButtonSectionWrapper>
        <CustomButton onClick={handleClose}>
          <ArrowBackIosIcon />
          Назад
        </CustomButton>
        <CustomButton type="submit" form="add-gear">
          <AddIcon />
          Добавить
        </CustomButton>
      </ButtonSectionWrapper>
    </FormContainer>
  );
};

export default StatusChangeModal;
