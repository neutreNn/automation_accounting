import React from 'react';
import styled from 'styled-components';
import { Box, Typography as MuiTypography } from '@mui/material';

const FooterContainer = styled(Box)`
  border-top: 1px solid #ccc;
  width: 100%;
`;

const FooterContent = styled(Box)`
  display: flex;
  justify-content: center;
  padding: 10px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Typography = styled(MuiTypography)`
  color: #fff;
`;

function Footer() {
    return (
        <FooterContainer>
            <FooterContent>
                <Typography>
                    circle.ru © 2024
                </Typography>
            </FooterContent>
        </FooterContainer>
    );
}

export default Footer;
