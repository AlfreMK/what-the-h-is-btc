import styled from "styled-components";
import { useState } from "react";

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
                {label}
            </DateCont>
            <PriceCont>
                {payload[0].value} {currency}
            </PriceCont>
          </Container>
        );
      }
    
      return null;
    };

export default CustomTooltip;

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
    font-weight: bold;
    text-align: center;
    background-color: #ccc;
    padding: 5px 0;
`;

const PriceCont = styled.div`
    text-align: center;
    width: 100px;
    padding: 10px 0px;
`;