import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Container, Typography } from '@mui/material';
import { useGetOneGearQuery, useUpdateGearMutation } from '../api/apiGear';
import { FormProvider, useForm } from 'react-hook-form';
import CustomButton from './CustomButton';
import StyledTextField from './StyledTextField';
import StyledSelectField from './StyledSelectField';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import EditIcon from '@mui/icons-material/Edit';
import { categoryOptions } from '../constants/categoryOptions';
import ErrorMessage from './ErrorMessage';
import CircleLoader from './CircleLoader';
import HistorySection from './HistorySection';
import { snackbarTitles } from '../constants/snackbarTitles';

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

const GearDetailsModal = ({ handleClose, selectedGear, handleSnackbar }) => {
    const { data: gear, isError, isLoading } = useGetOneGearQuery(selectedGear);
    const [updateGear] = useUpdateGearMutation();
    const methods = useForm();
  
    useEffect(() => {
      if (gear) {
        methods.reset({
          name: gear.name,
          category: gear.category,
          serial_number: gear.serial_number,
          inventory_number: gear.inventory_number,
          year_of_release: gear.year_of_release,
          year_of_input: gear.year_of_input,
          year_of_output: gear.year_of_output,
          price: gear.price,
          supplier: gear.supplier,
          location: gear.location,
        });
      }
    }, [gear, methods]);

    if (isError) return <ErrorMessage />;
    if (isLoading) return <CircleLoader />;
  
    const handleSubmit = (formData) => {
      updateGear({id: selectedGear, ...formData })
        .unwrap()
        .then(() => {
          handleSnackbar(snackbarTitles.gearUpdated);
          handleClose();
        })
        .catch((err) => {
          handleSnackbar(snackbarTitles.gearUpdateFailed);
          console.error('Ошибка запроса:', err);
        });
    };
  
    return (
      <FormContainer>
        <Typography variant="h5" component="h1" color="white" gutterBottom>
          {gear.name}
        </Typography>
        <FormSectionWrapper>
          <FormProvider {...methods}>
            <Form
              onSubmit={methods.handleSubmit(handleSubmit)}
              id="change-gear"
              name="change-gear"
            >
              <StyledTextField
                name="name"
                label="Название"
                requiredText="Наименование должно быть заполнено"
              />
              <StyledSelectField
                name="category"
                label="Категория"
                requiredText="Категория должна быть выбрана"
                options={categoryOptions}
              />
              <Row>
                <StyledTextField
                  name="serial_number"
                  label="Серийный номер"
                  requiredText="Серийный номер должен быть указан"
                />
                <StyledTextField
                  name="inventory_number"
                  label="Инвентарный номер"
                  requiredText="Инвентарный номер должен быть указан"
                />
              </Row>
              <Row>
                <StyledTextField
                  name="year_of_release"
                  label="Год выпуска"
                  requiredText="Год выпуска должен быть указан"
                />
                <StyledTextField
                  name="year_of_input"
                  label="Год ввода"
                  requiredText="Год ввода должен быть указан"
                />
                <StyledTextField
                  name="year_of_output"
                  label="Год вывода"
                  requiredText="Год вывода должен быть указан"
                />
              </Row>
              <Row>
                <StyledTextField
                  name="price"
                  label="Цена"
                  requiredText="Цена должна быть указана"
                />
                <StyledTextField
                  name="supplier"
                  label="Поставщик"
                  requiredText="Поставщик должен быть указан"
                />
              </Row>
              <StyledTextField
                name="location"
                label="Расположение"
                requiredText="Расположение должно быть указано"
              />
            </Form>
          </FormProvider>
          <HistorySection history={gear.history} />
        </FormSectionWrapper>
        <ButtonSectionWrapper>
          <CustomButton onClick={handleClose}>
            <ArrowBackIosIcon />
            Назад
          </CustomButton>
          <CustomButton type="submit" form="change-gear">
            <EditIcon />
            Редактировать
          </CustomButton>
        </ButtonSectionWrapper>
      </FormContainer>
    );
};
  
export default GearDetailsModal;