import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FormProvider, useForm } from 'react-hook-form';
import { Typography } from '@mui/material';
import { Edit as EditIcon, ArrowBackIos as ArrowBackIosIcon } from '@mui/icons-material';
import { Container as MuiContainer } from '@mui/system';
import { useUpdateGearMutation } from '../../api/apiGear';
import { formatDate } from '../../utils/formatDate';
import { snackbarTitles } from '../../constants/snackbarTitles';
import StyledTextField from '../common/StyledTextField';
import CustomButton from '../common/CustomButton';
import { useLazyGetOneWorkerQuery, useUpdateWorkerMutation } from '../../api/apiWorker';

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
  const [updateWorker] = useUpdateWorkerMutation();
  const [getLazyWorker] = useLazyGetOneWorkerQuery();
 
  useEffect(() => {
    const todayDate = formatDate(new Date());
    methods.reset({
      date_of_action: todayDate,
      action: availableStatus ? 'Взял' : 'Вернул',
    });
  }, [methods]);

  const handleSubmit = async (formData) => {
    try {
      const newHistoryRecord = {
        date: formData.date_of_action,
        action: formData.action,
        fio: formData.fio,
        employee_number: formData.employee_number,
      };
  
      await updateGear({
        id: selectedGear._id,
        available: !availableStatus,
        history: [...gearHistory, newHistoryRecord],
      }).unwrap();
  
      const workerResponse = await getLazyWorker(formData.employee_number);
      if (!workerResponse.data || !workerResponse.data.inventory) {
        throw new Error("Данные сотрудника или его инвентарь отсутствуют");
      }
      const currentWorker = workerResponse.data;
  
      const updatedInventory = availableStatus
        ? [...currentWorker.inventory, {
            _id: selectedGear._id,
            name: selectedGear.name,
            inventory_number: selectedGear.inventory_number,
          }]
        : currentWorker.inventory.filter(item => item._id !== selectedGear._id);
  
      await updateWorker({
        employee_number: formData.employee_number,
        inventory: updatedInventory,
      }).unwrap();

      handleSnackbar(snackbarTitles.statusChanged);
      handleClose();
    } catch (err) {
      console.error("Ошибка при обновлении статуса:", err);
      handleSnackbar(snackbarTitles.statusChangeFailed);
    }
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
