import React, { useEffect, useMemo, useState } from 'react';
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
import { useGetAllWorkersQuery, useLazyGetOneWorkerQuery, useUpdateWorkerMutation } from '../../api/apiWorker';
import StyledSelectField from '../common/StyledSelectField';
import CircleLoader from '../common/CircleLoader';
import ErrorMessage from '../sections/ErrorMessage';

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
  const { setValue, watch } = methods;

  const { data: workers, isLoading, isError } = useGetAllWorkersQuery();
  const [updateGear] = useUpdateGearMutation();
  const [updateWorker] = useUpdateWorkerMutation();
  const [getLazyWorker] = useLazyGetOneWorkerQuery();
  const [isFieldsDisabled, setIsFieldsDisabled] = useState(false);
 
  useEffect(() => {
    methods.reset({
      date_of_action: formatDate(new Date()),
      action: availableStatus ? 'Взял' : 'Вернул',
    });
  }, [methods]);

  useEffect(() => {
    if (!availableStatus && gearHistory?.length) {
      const lastRecord = [...gearHistory].reverse().find(record => record.action === "Взял");
      if (lastRecord) {
        setValue("fio", lastRecord.fio);
        setValue("employee_number", lastRecord.employee_number);
        setIsFieldsDisabled(true);
      }
    } else {
      setIsFieldsDisabled(false);
    }
  }, [availableStatus, gearHistory, setValue]);

  const selectedFio = watch('fio');
  const selectedNumber = watch('employee_number');

  const fioOptions = useMemo(() => 
    workers ? workers.map(worker => ({
      label: worker.fio,
      value: worker.fio,
    })) : [], 
    [workers]
  );
  
  const employeeOptions = useMemo(() => 
    workers ? workers.map(worker => ({
      label: worker.employee_number,
      value: worker.employee_number,
    })) : [], 
    [workers]
  );

  useEffect(() => {
    if (workers) {
      const worker = workers.find(w => w.fio === selectedFio);
      if (worker) setValue('employee_number', worker.employee_number);
    }
  }, [selectedFio, setValue, workers]);
  
  useEffect(() => {
    if (workers) {
      const worker = workers.find(w => w.employee_number === selectedNumber);
      if (worker) setValue('fio', worker.fio);
    }
  }, [selectedNumber, setValue, workers]);

  if (isLoading) return <CircleLoader />;
  if (isError) return <ErrorMessage />;

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
            <StyledSelectField
              name="fio"
              label="ФИО"
              requiredText="ФИО должно быть заполнено"
              disabled={isFieldsDisabled}
              options={fioOptions}
            />
            <StyledSelectField
              name="employee_number"
              label="Табельный номер"
              requiredText="Табельный номер должен быть выбран"
              disabled={isFieldsDisabled}
              options={employeeOptions}
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
