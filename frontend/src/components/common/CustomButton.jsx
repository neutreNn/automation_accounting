import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CustomButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #161617;
  color: #f1f1f1;
  border: 1px solid #bababa;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #222223;
    transform: scale(1.02);
  }

  &:active {
    background-color: #1a1a1b;
    transform: scale(0.98);
  }
`;

function CustomButton({ children, onClick, link, type = 'button', form, ...rest }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (link) {
      navigate(link);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <CustomButtonWrapper onClick={handleClick} type={type} form={form} {...rest}>
      {children}
    </CustomButtonWrapper>
  );
}

export default CustomButton;
