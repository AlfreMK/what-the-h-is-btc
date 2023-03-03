import { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import BTCChart from './components/BTCChart';
import Gecko from './components/Gecko';
import BTCLogo from './components/BTCLogo';
import Price from './components/Price';


function App() {
  return (
    <Container>
      <Title>
        <BTCLogo />
        <h2>Bitcoin grow since...</h2>
      </Title>
      <Price />
      <BTCChart />
      <Gecko />

      
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  h2 {
    margin-left: 10px;
  }
`;
