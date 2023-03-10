import { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import BTCChart from './components/BTCChart';
import BTCLogo from './components/BTCLogo';
import Price from './components/Price';
import Footer from './components/Footer';
import InfoCard from './components/InfoCard';
import text_data from './utils/text_data.json';
import { CardContext } from './utils/contexts';


function App() {
  const [cardActive, setCardActive] = useState<number|undefined>(undefined);
  return (
    <Container>
      <Title>
        <h2>What the h#@! is </h2>
        <BTCLogo />
        <h2>Bitcoin?</h2>
      </Title>
      <Price />
      <CardContext.Provider value={{ cardActive, setCardActive }}>
        <Cards>
        {text_data.map((data, index) => {
          return <InfoCard key={index} index={index} data={data} context={CardContext} />;
          })
        }
        </Cards>
      </CardContext.Provider>
      <StatisticsTitle>
        Let's jump into statistics
      </StatisticsTitle>
      <BTCChart />
      <Footer />

      
    </Container>
  );
}

export default App;

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

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
  flex-wrap: wrap;
  margin: 50px 0;
  h2 {
    font-size: 2.1rem;
    margin: 0 10px;
  }
`;

const StatisticsTitle = styled.h2`
  font-size: 1.8rem;
  margin: 30px 0;
`;
