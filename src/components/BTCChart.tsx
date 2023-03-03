import { useEffect, useState } from "react";
import { getDataFromBegginingOfTime } from "../utils/functions";
import ZoomChart from "./ZoomChart";
import styled from "styled-components";
import { formatMoney } from "../utils/functions";


interface IPriceData {
  index: number;
  year: number;
  date: string;
  price: number;
}

interface IPrices {
  first: number;
  last: number;
}

const BTCChart = () => {
  const [priceData, setPriceData] = useState<IPriceData[]>([]);
  const [prices, setPrices] = useState<IPrices>({ first: 0, last: 0 });

  useEffect(() => {
    getDataFromBegginingOfTime().then((data) => {
      setPriceData(data);
      setPrices({
        first: data[0].price,
        last: data[data.length - 1].price,
      });
    });
  }, []);

  return (
    <Container>
      <ContainerChart>
        <p>Click and drag on the chart to zoom in</p>
        <ZoomChart initialData={priceData} />
      </ContainerChart>
      <span>BTC has grow from {formatMoney(prices.first)} to {formatMoney(prices.last)}</span>
      <span>That's a {formatPercentage(increase(prices))}% increase</span>
    </Container>
  );
};

function increase(prices: IPrices) {
  return ((prices.last - prices.first) / prices.first) * 100;
}

function formatPercentage(number: number) {
  // 10,000.00
  return number.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default BTCChart;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ContainerChart = styled.div`
  background-color: rgb(25 27 29);
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  @media (max-width: 768px) {
    width: 100%;
  }
  margin: 20px 0;
  padding: 20px;
  border-radius: 10px;
`;

