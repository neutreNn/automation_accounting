import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FormProvider, useForm } from 'react-hook-form';
import { Typography } from '@mui/material';
import { Container as MuiContainer } from '@mui/system';
import { DeleteForever as DeleteForeverIcon, ArrowBackIos as ArrowBackIosIcon } from '@mui/icons-material';
import { snackbarTitles } from '../../constants/snackbarTitles';
import { filterData } from '../../utils/filterData';
import StyledTextField from '../common/StyledTextField';
import CustomButton from '../common/CustomButton';
import StyledSlider from '../common/StyledSlider';
import StyledSelectField from '../common/StyledSelectField';

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

const Row = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const FilterLogsModal = ({ handleClose, setFilters, filters, handleSnackbar }) => {
  const methods = useForm();

  useEffect(() => {
    methods.reset({
      ...filters,
    });
  }, [filters]);

  const handleSubmit = (data) => {
    const filteredData = filterData(data);
    setFilters(filteredData);
    handleSnackbar(snackbarTitles.filterAdded);
    handleClose();
  };

  const actionOptions = [
    { value: 'Обновление', label: 'Обновление' },
    { value: 'Удаление', label: 'Удаление' },
    { value: 'Добавление', label: 'Добавление' },
  ];

  const moduleOptions = [
    { value: 'Инвентарь', label: 'Инвентарь' },
    { value: 'Сотрудники', label: 'Сотрудники' },
  ];
  
  return (
    <FormContainer maxWidth="sm">
      <Typography variant="h5" component="h1" color="white" gutterBottom>
        Фильтры
      </Typography>
      <FormSectionWrapper>
        <FormProvider {...methods}>
          <Form
            onSubmit={methods.handleSubmit(handleSubmit)}
            id="filter-logs"
            name="filter-logs"
          >
            <StyledSelectField
              name="typeAction"
              label="Тип"
              options={actionOptions}
            />
            <StyledSelectField
              name="module"
              label="Модуль"
              options={moduleOptions}
            />
            <StyledTextField
              name="user"
              label="Пользователь"
            />
          </Form>
        </FormProvider>
      </FormSectionWrapper>
      <ButtonSectionWrapper>
        <CustomButton onClick={handleClose}>
          <ArrowBackIosIcon />
          Назад
        </CustomButton>
        <CustomButton type="submit" form="filter-logs">
          <DeleteForeverIcon />
          Отфильтровать
        </CustomButton>
      </ButtonSectionWrapper>
    </FormContainer>
  );
};

export default FilterLogsModal;
