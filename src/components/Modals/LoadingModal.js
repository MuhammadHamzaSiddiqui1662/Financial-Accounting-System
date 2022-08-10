import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '../Container';

function LoadingModal(props) {
  return (
    <div style={{
      position: 'absolute',
      zIndex: '100',
      width: '100vw',
      height: '100vh',
      background: 'rgb(0,0,0,0.9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#999999'
    }}>
      <Container w='fit-content'>
        <CircularProgress
          color='inherit'
          style={{
            marginRight: 20
          }}
        />
        <h1>loading...</h1>
      </Container>
    </div>
  );
}

export default LoadingModal;