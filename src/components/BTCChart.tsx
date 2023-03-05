import { useEffect, useState } from "react";
import { getDataFromBegginingOfTime } from "../utils/functions";
import ZoomChart from "./ZoomChart";
import styled from "styled-components";
import { formatMoney, formatDate } from "../utils/functions";
import { IPriceData, IPrices } from "../utils/interfaces";
import { PricesContext } from "../utils/contexts";
import FadeInSection from "./FadeInSection";


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
        <PricesContext.Provider value={{prices, setPrices}}>
          <ZoomChart initialData={priceData} />
        </PricesContext.Provider>
      </ContainerChart>
      <FadeInSection>
        <TextAnim>
          Since 
          <Highlight>
            {formatDate(prices.firstPriceData.date)}
          </Highlight>
          to 
          <Highlight>
            {formatDate(prices.lastPriceData.date)}
          </Highlight>
        </TextAnim>
      </FadeInSection>
      <FadeInSection>
        <TextAnim>
          Has gone from
          <Highlight>
            {formatMoney(prices.firstPriceData.price)}
          </Highlight>
          to 
          <Highlight>
            {formatMoney(prices.lastPriceData.price)}
          </Highlight>
          USD
        </TextAnim>
      </FadeInSection>
      <FadeInSection>
        <TextAnim>
          A
          <Highlight>
            {formatPercentage(increase(prices))}%
          </Highlight>
          change
        </TextAnim>
      </FadeInSection>
      <FadeInSection>
        <TextAnim>
          =
          <Highlight>
            {formatPercentage(getAnnualIncrease(prices))}%
          </Highlight>
          yearly
        </TextAnim>
      </FadeInSection>
      <FadeInSection>
        <TextAnim>
          =
          <Highlight>
            {formatPercentage(getMonthlyIncrease(prices))}%
          </Highlight>
          monthly
        </TextAnim>
      </FadeInSection>
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

function getAnnualIncrease(prices: IPrices) {
  const days = getDaysBetweenDates(new Date(prices.firstPriceData.date), new Date(prices.lastPriceData.date));
  const years = days / 365;
  return increase(prices) / years;
}

function getMonthlyIncrease(prices: IPrices) {
  const days = getDaysBetweenDates(new Date(prices.firstPriceData.date), new Date(prices.lastPriceData.date));
  const months = days / 30;
  return increase(prices) / months;
}

function getDaysBetweenDates(date1: Date, date2: Date) {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
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
    padding: 20px 0px;
    border-radius: 0px;
    font-size: 0.9rem;
  }
  margin: 20px 0;
  padding: 20px;
  border-radius: 10px;
`;

const TextAnim = styled.span`
  font-size: 1.7rem;
  color: #fff;
  margin: 15px 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const Highlight = styled.span`
  font-family: "Roboto Mono", monospace;
  color: rgb(129 140 248);
  margin: 0 5px;
  font-size: 1.8rem;
  font-weight: 700;
  background-color: rgb(25 27 29);
  padding: 10px;
  border-radius: 10px;
  box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;