import { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import BTCChart from './components/BTCChart';
import Gecko from './components/Gecko';
import BTCLogo from './components/BTCLogo';
import Price from './components/Price';
import Footer from './components/Footer';

function App() {
  return (
    <Container>
      <Title>
        <h2>What the h#@! is </h2>
        <BTCLogo />
        <h2>Bitcoin?</h2>
      </Title>
      <Price />
      <BTCChart />
      <Gecko />
      <Footer />

      
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 50px 0;
  h2 {
    font-size: 1.5rem;
    margin: 0 10px;
  }
`;
