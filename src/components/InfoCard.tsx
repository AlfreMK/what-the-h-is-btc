import styled from "styled-components"
import { useContext } from "react";
import { ICardContext } from "../utils/interfaces";
import AnimateHeight from 'react-animate-height';

const InfoCard = (props: any) => {
    const { data, context, index } = props;
    const { cardActive, setCardActive } = useContext<ICardContext>(context);
    const updateCardActive = (index: number) => {
        if (cardActive === index) {
            setCardActive(undefined);
        } else {
            setCardActive(index);
        }
    }

    return (
        <Card>
            <Title onClick={() => updateCardActive(index)}>
                {data.title}
            </Title>
            <AnimateHeight height={
                cardActive === index ? "auto" : 0
                }>
                <Description>
                    <div style={{margin: "20px 0"}}>
                        {data.description.map((text: string, index: number) => {
                            return <Text key={index}>{text}</Text>
                        })}
                    </div>
                </Description>
            </AnimateHeight>
        </Card>
    )
};

export default InfoCard;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 2px 0px;
    width: 80%;
    background-color: #2c3033;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const Title = styled.div`
    display: flex;
    font-size: 17px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 20px 0;
    cursor: pointer;
    background-color: rgb(25 27 29);
    user-select: none;
    transition: all 0.5s ease-in-out;
    &:hover {
        background-color: #232629;
    }
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const Description = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.2s ease-in-out;
`;

const Text = styled.p`
    font-size: 15px;
    margin: 5px 0;
    text-align: justify;
`;