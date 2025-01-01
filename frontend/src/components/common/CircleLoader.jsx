﻿import React from 'react';
import styled from 'styled-components';
import { CircularProgress as MuiCircularProgress } from '@mui/material';

const CircularProgress = styled(MuiCircularProgress)`
    color: white !important;
`;

const LoaderContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function CircleLoader() {
    return (
        <LoaderContainer>
            <CircularProgress size={70} />
        </LoaderContainer>
    );
}

export default CircleLoader;