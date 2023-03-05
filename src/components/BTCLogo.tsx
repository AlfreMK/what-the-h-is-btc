import styled from "styled-components";

const BTCLogo = (props: any) => {
    return (
        <Container {...props}>
            <i className="fa fa-bitcoin"></i>
        </Container>
    );
    };

export default BTCLogo;

const Container = styled.span`
    font-size: 27px;
    color: #e3ded7;
    background-color: #f7931a;
    border-radius: 50%;
    height: 45px;
    aspect-ratio: auto 1/1;
    display: flex;
    align-items: center;
    justify-content: center;
    // rotate 45deg
    transform: rotate(14deg);

`;
