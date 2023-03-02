import { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import BTCChart from './components/BTCChart';
import Gecko from './components/Gecko';


function App() {
  return (
    <Container>
      <h2>Bitcoin grow since...</h2>
      <p>Click and drag on the chart to zoom in</p>
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
