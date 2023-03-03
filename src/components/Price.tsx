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
            <Data> {formatMoney(price)} {currency}</Data>
        </Container>
    );
    };

export default Price;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Data = styled.div`
    font-size: 2rem;
    color: #ece8e3;
    font-weight: bold;
`;