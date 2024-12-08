import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import StyledTextField from './StyledTextField';
import { FormProvider, useForm } from 'react-hook-form';
import { useUpdateGearMutation } from '../api/apiGear';
import { Container } from '@mui/system';
import CustomButton from './CustomButton';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { formatDate } from '../utils/formatDate';

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

const StatusChangeModal = ({ handleSnackbar, handleClose, selectedGear, availableStatus, gearHistory }) => {
  const methods = useForm();
  const [updateGear] = useUpdateGearMutation();

  useEffect(() => {
    const todayDate = formatDate(new Date());
    methods.reset({
      date_of_action: todayDate,
      action: availableStatus ? 'Взял' : 'Вернул',
    });
  }, [methods]);

  const handleSubmit = (formData) => {
    const newHistoryRecord = {
      date: formData.date_of_action,
      action: formData.action,
      fio: formData.fio,
      employee_number: formData.employee_number,
    };

    updateGear({
      id: selectedGear,
      available: !availableStatus, 
      history: [...gearHistory, newHistoryRecord],
    })
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
        Редактировать статус инвентаря
      </Typography>
      <FormSectionWrapper>
        <FormProvider {...methods}>
          <Form 
            onSubmit={methods.handleSubmit(handleSubmit)}
            id="edit-status-gear"
            name="edit-status-gear"
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
        <CustomButton type="submit" form="edit-status-gear">
          <EditIcon />
          Редактировать
        </CustomButton>
      </ButtonSectionWrapper>
    </FormContainer>
  );
};

export default StatusChangeModal;
