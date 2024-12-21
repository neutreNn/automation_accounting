import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FormProvider, useForm } from 'react-hook-form';
import { Container as MuiContainer, Typography } from '@mui/material';
import { ArrowBackIos as ArrowBackIosIcon, Edit as EditIcon } from '@mui/icons-material';
import { snackbarTitles } from '../constants/snackbarTitles';
import CustomButton from './CustomButton';
import StyledTextField from './StyledTextField';
import ErrorMessage from './ErrorMessage';
import CircleLoader from './CircleLoader';
import { useGetOneWorkerQuery, useUpdateWorkerMutation } from '../api/apiWorker';
import InventorySection from './InventorySection';
import { formatDate } from '../utils/formatDate';

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

const FormSectionWrapper = styled.div`
  background-color: #050505;
  border: 1px solid #343435;
  border-radius: 10px 10px 0 0;
  padding: 15px;
  display: flex;
  gap: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
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

const Row = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const WorkersDetailsModal = ({ handleClose, selectedWorker, handleSnackbar }) => {
    const { data: worker, isError, isLoading } = useGetOneWorkerQuery(selectedWorker);
    const [updateWorker] = useUpdateWorkerMutation();
    const methods = useForm();
  
    useEffect(() => {
      if (worker) {
        methods.reset({
          fio: worker.fio,
          date_of_birth: formatDate(worker.date_of_birth, true),
          employee_number: worker.employee_number,
          passport: worker.passport,
          inn_number: worker.inn_number,
          post: worker.post,
          phone_number: worker.phone_number,
        });
      }
    }, [worker, methods]);

    if (isError) return <ErrorMessage />;
    if (isLoading) return <CircleLoader />;
  
    const handleSubmit = (formData) => {
      updateWorker({id: selectedWorker, ...formData })
        .unwrap()
        .then(() => {
          handleSnackbar(snackbarTitles.workerUpdated);
          handleClose();
        })
        .catch((err) => {
          handleSnackbar(snackbarTitles.workerUpdateFailed);
          console.error('Ошибка запроса:', err);
        });
    };
  
    return (
      <FormContainer>
        <Typography variant="h5" component="h1" color="white" gutterBottom>
          {worker.fio}
        </Typography>
        <FormSectionWrapper>
          <FormProvider {...methods}>
            <Form
              onSubmit={methods.handleSubmit(handleSubmit)}
              id="change-worker"
              name="change-worker"
            >
              <StyledTextField
                name="fio"
                label="ФИО"
                requiredText="ФИО должно быть заполнено"
              />
              <StyledTextField
                name="date_of_birth"
                label="Дата рождения"
                requiredText="Дата рождения должна быть заполнена"
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
                  name="post"
                  label="Должность"
                  requiredText="Должность должна быть указана"
                />
              </Row>
              <StyledTextField
                name="phone_number"
                label="Номер телефона"
                requiredText="Номер телефона должен быть указан"
              />
            </Form>
          </FormProvider>
          <InventorySection inventory={worker.inventory} />
        </FormSectionWrapper>
        <ButtonSectionWrapper>
          <CustomButton onClick={handleClose}>
            <ArrowBackIosIcon />
            Назад
          </CustomButton>
          <CustomButton type="submit" form="change-worker">
            <EditIcon />
            Редактировать
          </CustomButton>
        </ButtonSectionWrapper>
      </FormContainer>
    );
};
  
export default WorkersDetailsModal;