import styled from "styled-components";
import { useState, useEffect } from "react";
import { getPrice, formatMoney } from "../utils/functions";

const Price = () => {
    const [currency, setCurrency] = useState("USD");
    const [price, setPrice] = useState(0);

    useEffect(() => {
        const fetchPrice = async () => {
            const price = await getPrice();
            setPrice(price);
        };
    
        fetchPrice();
        const intervalId = setInterval(fetchPrice, 60000); // update price every minute
        return () => clearInterval(intervalId);
      }, []);

    return (
        <Container>
            1 BTC = 
            <Data> {formatMoney(price)} </Data> {currency}
        </Container>
    );
    };

export default Price;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.7rem;
    font-weight: bold;
    margin-bottom: 30px;
`;

const Data = styled.span`
    font-family: "Roboto Mono", monospace;
    color: rgb(129 140 248);
    background-color: rgb(25 27 29);
    margin: 0px 10px;
    padding: 10px;
    border-radius: 10px;
    font-size: 1.9rem;
`;