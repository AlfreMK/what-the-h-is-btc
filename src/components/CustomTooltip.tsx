import styled from "styled-components";
import { useState } from "react";
import { formatMoney } from "../utils/functions";

interface ICustomTooltipProps {
    active?: boolean;
    payload?: any;
    label?: string;
}


const CustomTooltip = ({ active, payload, label }: ICustomTooltipProps) => {
    const [currency, setCurrency] = useState("USD");
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


  
function formatDate(value: string): string {
    const date = new Date(value);
    // formar 25 May, 2021
    return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}, ${date.getFullYear()}`;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    background-color: #1d1f20;
    opacity: 0.9;
    width: 120px;
`;

const DateCont = styled.div`
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    text-align: center;
    color: #fff;
    font-size: 0.9rem;
    background-color: #2563eb;
    padding: 5px 0;
`;

const PriceCont = styled.div`
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    text-align: center;
    font-size: 1rem;
    padding: 10px 0px;
`;