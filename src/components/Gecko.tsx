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
    color: #e3ded7;
    text-decoration: none;
    font-weight: bold;
    &:hover {
        text-decoration: underline;
    }
`;

const Container = styled.span`
    font-size: 12px;
    color: #e3ded7;
    margin: 10px;
    background-color: rgb(64, 69, 73);
    padding: 10px;
    border-radius: 5px;
`;
