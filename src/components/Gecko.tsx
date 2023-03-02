import styled from "styled-components";

const Gecko = () => {
    return (
        <Container>
            Powered by <Link href="https://www.coingecko.com/en/api"> CoinGecko</Link>
        </Container>
    );
    };

export default Gecko;

const Link = styled.a`
    color: #000;
    text-decoration: none;
    font-weight: bold;
    &:hover {
        text-decoration: underline;
    }
`;

const Container = styled.span`
    font-size: 12px;
    margin: 10px 0;
    background-color: #ccc;
    padding: 10px;
    border-radius: 5px;
`;
