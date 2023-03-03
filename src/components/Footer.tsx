import styled from "styled-components";

const Footer = () => {
    return (
        <Container>
            Made by{" "}
            <a href="https://github.com/AlfreMK">
                Alfredo Medina
            </a>
        </Container>
    );
};

export default Footer;

const Container = styled.footer`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    a {
        color: #818cf8;
        text-decoration: none;
        font-weight: bold;
        margin-left: 5px;
    }
`;
