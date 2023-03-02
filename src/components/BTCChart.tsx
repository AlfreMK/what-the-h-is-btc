import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Brush } from "recharts";
import { getDataFromBegginingOfTime } from "../utils/functions";
import CustomTooltip from "./CustomTooltip";
import ZoomChart from "./ZoomChart"; 


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
    <div>
      {/* <LineChart width={600} height={300} data={priceData}>
        <XAxis dataKey="year" />
        <YAxis dataKey="price" />
        <Tooltip content={<CustomTooltip/>} />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
      </LineChart> */}
      <ZoomChart initialData={priceData} />

    </div>
  );
};


export default BTCChart;
