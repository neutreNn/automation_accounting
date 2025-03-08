import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { Typography } from '@mui/material';
import CustomButton from '../common/CustomButton';
import { Container as MuiContainer } from '@mui/system';
import { snackbarTitles } from '../../constants/snackbarTitles';

const FormContainer = styled(MuiContainer)`
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 30px;
  transform: translate(-50%, -50%);
  border: 1px solid #343435;
  border-radius: 15px;
  background-color: #121212;
  z-index: 1000;
`;

const StyledVideo = styled.video`
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
`;

const VideoSection = styled.div`
  background-color: #050505;
  border: 1px solid #343435;
  border-radius: 10px 10px 0 0;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
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

const BarcodeScannerModal = ({ handleCloseScanModal, onDetected, handleSnackbar }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    let isMounted = true;

    const startScanning = () => {
      codeReader.decodeFromVideoDevice(
        undefined,
        videoRef.current,
        (result, err, controls) => {
          if (!isMounted) return;
          if (result) {
            if (onDetected) {
              handleSnackbar(snackbarTitles.barcodeScanDetected);
              onDetected(result.getText());
            }
            controls.stop();
            handleCloseScanModal();
          }
          if (err && err.name !== 'NotFoundException') {
            handleSnackbar(snackbarTitles.barcodeScanFailed);
            handleCloseScanModal();
          }
        }
      ).catch(() => {
        handleSnackbar(snackbarTitles.barcodeScanError);
        handleCloseScanModal();
      });
    };

    startScanning();

    return () => {
      isMounted = false;
      const tracks = videoRef.current?.srcObject?.getTracks();
      if (tracks) {
        tracks.forEach(track => track.stop());
      }
    };
  }, [onDetected]);

  return (
    <FormContainer maxWidth="sm">
      <Typography variant="h5" color="white" gutterBottom>
        Сканер штрихкодов
      </Typography>
      <VideoSection>
        <StyledVideo ref={videoRef} />
      </VideoSection>
      <ButtonSectionWrapper>
        <CustomButton onClick={handleCloseScanModal}>Закрыть</CustomButton>
      </ButtonSectionWrapper>
    </FormContainer>
  );
};

export default BarcodeScannerModal;
