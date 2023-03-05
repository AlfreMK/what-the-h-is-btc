import styled from "styled-components";
import Gecko from "./Gecko";

const Footer = () => {
    return (
        <Container>
            Made by{" "}
            <a href="https://github.com/AlfreMK">
                Alfredo Medina
            </a>
            <Gecko />

        </Container>
    );
};

export default Footer;

const Container = styled.footer`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin: 40px 20px;
    margin-top: 70px;
    a {
        color: #818cf8;
        text-decoration: none;
        font-weight: bold;
        margin-left: 5px;
    }
`;
