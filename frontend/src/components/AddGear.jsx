import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Container, Typography } from '@mui/material';
import StyledTextField from './StyledTextField';
import CustomButton from './CustomButton';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import StyledSelectField from './StyledSelectField';
import { useCreateGearMutation } from '../api/apiGear';
import { categoryOptions } from '../constants/categoryOptions';

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

function AddGear({handleClose, handleSnackbar}) {
  const methods = useForm();
  const [createGear] = useCreateGearMutation();

  const handleSubmit = (formData) => {
    createGear(formData)
      .unwrap()
      .then(() => {
        handleSnackbar("Инвентарь добавлен", "success");
        handleClose();
      })
      .catch((err) => {
        handleSnackbar("Не удалось добавить инвентарь", "error");
        console.error('Ошибка запроса:', err);
      });
  };

  return (
    <FormContainer maxWidth="sm">
      <Typography variant="h5" component="h1" color="white" gutterBottom>
        Добавить инвентарь
      </Typography>
      <FormSectionWrapper>
        <FormProvider {...methods}>
          <Form 
            onSubmit={methods.handleSubmit(handleSubmit)}
            id="add-gear"
            name="add-gear"
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
}

export default AddGear;