import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import StyledTextField from './StyledTextField';
import { FormProvider, useForm } from 'react-hook-form';
import { Container } from '@mui/system';
import CustomButton from './CustomButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import StyledSlider from './StyledSlider';
import StyledSelectField from './StyledSelectField';
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

const Row = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const FilterModal = ({ handleClose, setFilters, filters }) => {
  const methods = useForm();

  useEffect(() => {
    methods.reset({
      ...filters,
    });
  }, [filters]);

  const handleSubmit = (data) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => {
        if (key === "price" && (value[0] === 0 && value[1] === 100000)) {
          return false;
        }
        if (key === "year_of_release" && value[0] === 1950 && value[1] === new Date().getFullYear()) {
          return false;
        }
        if (key === "year_of_input" && value[0] === 1950 && value[1] === new Date().getFullYear()) {
          return false;
        }
        if (key === "year_of_output" && value[0] === 1950 && value[1] === new Date().getFullYear() + 50) {
          return false;
        }
        return value !== "" && value !== undefined;
      })
    );
  
    setFilters(filteredData);
    handleClose();
  };
  

  return (
    <FormContainer maxWidth="sm">
      <Typography variant="h5" component="h1" color="white" gutterBottom>
        Фильтры
      </Typography>
      <FormSectionWrapper>
        <FormProvider {...methods}>
          <Form
            onSubmit={methods.handleSubmit(handleSubmit)}
            id="filter-gear"
            name="filter-gear"
          >
            <StyledTextField
              name="name"
              label="Название"
            />
            <Row>
              <StyledTextField
                name="serial_number"
                label="Серийный номер"
              />
              <StyledTextField
                name="inventory_number"
                label="Инвентарный номер"
              />
            </Row>
            <StyledTextField
              name="supplier"
              label="Поставщик"
            />
            <StyledSelectField
              name="category"
              label="Категория"
              options={categoryOptions}
            />
            <StyledSlider
              label="Цена"
              name="price"
              interval={1000}
              maxValue={100000}
            />
            <StyledSlider
              label="Год выпуска"
              name="year_of_release"
              minValue={1950}
              maxValue={new Date().getFullYear()}
            />
            <StyledSlider
              label="Год ввода"
              name="year_of_input"
              minValue={1950}
              maxValue={new Date().getFullYear()}
            />
            <StyledSlider
              label="Год вывода"
              name="year_of_output"
              minValue={1950}
              maxValue={new Date().getFullYear() + 50}
            />
          </Form>
        </FormProvider>
      </FormSectionWrapper>
      <ButtonSectionWrapper>
        <CustomButton onClick={handleClose}>
          <ArrowBackIosIcon />
          Назад
        </CustomButton>
        <CustomButton type="submit" form="filter-gear">
          <DeleteForeverIcon />
          Отфильтровать
        </CustomButton>
      </ButtonSectionWrapper>
    </FormContainer>
  );
};

export default FilterModal;
