import styled from "styled-components";
import { useState } from "react";

interface ICustomTooltipProps {
    active?: boolean;
    payload?: any;
    label?: string;
}


const CustomTooltip = ({ active, payload, label }: ICustomTooltipProps) => {
    const [currency, setCurrency] = useState("USD");
    console.log("payload", payload)
    if (active && payload && payload.length) {
        return (
          <Container>
            <DateCont> 
                {formatDate(payload[0].payload["date"])}
            </DateCont>
            <PriceCont>
                {formatMoney(payload[0].value)} {currency}
            </PriceCont>
          </Container>
        );
      }
    
      return null;
    };

export default CustomTooltip;


function formatMoney(value: number): string {
    return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
}
  
function formatDate(value: string): string {
    const date = new Date(value);
    // formar 25 May, 2021
    return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}, ${date.getFullYear()}`;
}

const Container = styled.div`
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
`;

const DateCont = styled.div`
    text-align: center;
    background-color: #ccc;
    padding: 5px 0;
`;

const PriceCont = styled.div`
    text-align: center;
    width: 100px;
    padding: 10px 0px;
`;