import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import JsBarcode from "jsbarcode";
import { Typography } from '@mui/material';
import { Download as DownloadIcon, ArrowBackIos as ArrowBackIosIcon } from '@mui/icons-material';
import { Container as MuiContainer } from '@mui/system';
import CustomButton from './CustomButton';

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

const BarcodeSection = styled.div`
  background-color: #050505;
  border: 1px solid #343435;
  border-radius: 10px 10px 0 0;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center; 
  min-height: 150px;
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

const BarcodeGenerator = ({ handleClose, selectedGear }) => {
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (barcodeRef.current && selectedGear) {
      JsBarcode(barcodeRef.current, selectedGear, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 60,
        displayValue: true,
      });
    }
  }, [selectedGear]);

  const handleDownload = () => {
    const svgElement = barcodeRef.current;
  
    if (!svgElement) return;
  
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    const img = new Image();
    const svgBlob = new Blob([new XMLSerializer().serializeToString(svgElement)], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);
  
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
  
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `${selectedGear || 'barcode'}.png`;
      link.click();
    };
  
    img.src = url;
  };
  

  return (
    <FormContainer maxWidth="sm">
      <Typography variant="h5" component="h1" color="white" gutterBottom>
        Штрихкод для инвентаря
      </Typography>
      <BarcodeSection>
        <svg ref={barcodeRef}></svg>
      </BarcodeSection>
      <ButtonSectionWrapper>
        <CustomButton onClick={handleClose}>
          <ArrowBackIosIcon />
          Назад
        </CustomButton>
        <CustomButton onClick={handleDownload}>
          <DownloadIcon />
          Скачать
        </CustomButton>
      </ButtonSectionWrapper>
    </FormContainer>
  );
};

export default BarcodeGenerator;
