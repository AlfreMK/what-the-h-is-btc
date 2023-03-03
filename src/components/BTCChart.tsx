import { useEffect, useState } from "react";
import { getDataFromBegginingOfTime } from "../utils/functions";
import ZoomChart from "./ZoomChart";
import styled from "styled-components";


interface IPriceData {
  index: number;
  year: number;
  date: string;
  price: number;
}

const BTCChart = () => {
  const [priceData, setPriceData] = useState<IPriceData[]>([]);

  useEffect(() => {
    getDataFromBegginingOfTime().then((data) => {
      setPriceData(data);
    });
  }, []);

  return (
    <Container>
      <p>Click and drag on the chart to zoom in</p>
      <ZoomChart initialData={priceData} />
    </Container>
  );
};


export default BTCChart;

const Container = styled.div`
  background-color: rgb(25 27 29);
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    width: 100%;
  }
  margin: 20px 0;
  padding: 20px;
  border-radius: 10px;
`;

