import { useEffect, useState } from "react";
import { getDataFromBegginingOfTime } from "../utils/functions";
import ZoomChart from "./ZoomChart";
import styled from "styled-components";
import { formatMoney, formatDate } from "../utils/functions";


interface IPriceData {
  index: number;
  year: number;
  date: string;
  price: number;
}

interface IPrices {
  firstPriceData: IPriceData;
  lastPriceData: IPriceData;
}

const BTCChart = () => {
  const defaultPriceData = { index: 0, year: 0, date: "", price: 0 };
  const [priceData, setPriceData] = useState<IPriceData[]>([]);
  const [prices, setPrices] = useState<IPrices>({
    firstPriceData: defaultPriceData,
    lastPriceData: defaultPriceData,
  });

  useEffect(() => {
    getDataFromBegginingOfTime().then((data) => {
      setPriceData(data);
      setPrices({
        firstPriceData: data[0],
        lastPriceData: data[data.length - 1],
      });
    });
  }, []);

  return (
    <Container>
      <ContainerChart>
        <p>Click and drag on the chart to zoom in</p>
        <ZoomChart initialData={priceData} />
      </ContainerChart>
      <span>
        BTC has grow from {formatMoney(prices.firstPriceData.price)} to {formatMoney(prices.lastPriceData.price)} USD
        since {formatDate(prices.firstPriceData.date)} to {formatDate(prices.lastPriceData.date)}
      </span>
      <span>
        That's a {formatPercentage(increase(prices))}% increase
      </span>
      <span>
        Equivalent to a XX anual increase
      </span>
      <span>
        Equivalent to a XX monthly increase
      </span>
    </Container>
  );
};

function increase(prices: IPrices) {
  return ((prices.lastPriceData.price - prices.firstPriceData.price) / prices.firstPriceData.price) * 100;
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

