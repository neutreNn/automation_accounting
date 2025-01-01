import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FormProvider, useForm } from 'react-hook-form';
import { DeleteForever as DeleteForeverIcon, ArrowBackIos as ArrowBackIosIcon } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Container as MuiContaine } from '@mui/system';
import { useRemoveGearMutation } from '../../api/apiGear';
import { snackbarTitles } from '../../constants/snackbarTitles';
import StyledTextField from '../common/StyledTextField';
import CustomButton from '../common/CustomButton';

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

const DeleteGearModal = ({ handleSnackbar, handleClose, selectedGear }) => {
  const methods = useForm();
  const [removeGear] = useRemoveGearMutation();

  useEffect(() => {
    methods.reset({
      name: selectedGear.name,
      serial_number: selectedGear.serial_number,
      inventory_number: selectedGear.inventory_number,
      year_of_output: selectedGear.year_of_output,
      price: selectedGear.price,
    });
  }, []);


  const handleSubmit = () => {
    removeGear(selectedGear._id)
      .unwrap()
      .then(() => {
        handleSnackbar(snackbarTitles.gearDeleted);
        handleClose();
      })
      .catch((err) => {
        handleSnackbar(snackbarTitles.gearDeleteFailed);
        console.error('Ошибка запроса:', err);
      });
  };

  return (
    <FormContainer maxWidth="sm">
      <Typography variant="h5" component="h1" color="white" gutterBottom>
        Уверенны что хотите удалить инвентарь?
      </Typography>
      <FormSectionWrapper>
        <FormProvider {...methods}>
          <Form 
            onSubmit={methods.handleSubmit(handleSubmit)}
            id="delete-gear"
            name="delete-gear"
          >
            <StyledTextField
                name="name"
                label="Название"
                disabled
            />
            <StyledTextField
              name="serial_number"
              label="Серийный номер"
              disabled
            />
            <StyledTextField
              name="inventory_number"
              label="Инвентарный номер"
              disabled
            />
            <StyledTextField
              name="year_of_output"
              label="Год вывода"
              disabled
            />
            <StyledTextField
              name="price"
              label="Цена"
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
        <CustomButton type="submit" form="delete-gear">
          <DeleteForeverIcon />
          Удалить
        </CustomButton>
      </ButtonSectionWrapper>
    </FormContainer>
  );
};

export default DeleteGearModal;
