import styled from "styled-components"
import { useContext } from "react";


interface ICardContext {
    cardActive: number|undefined;
    setCardActive: (value: number|undefined) => void;
}

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
            <Description style={{ display: cardActive === index ? "flex" : "none" }}>
                {data.description.map((text: string, index: number) => {
                    return <span key={index}>{text}</span>
                })}
            </Description>
        </Card>
    )
};

export default InfoCard;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80%;
    background-color: #1d1f20;
`;

const Title = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 20px 0;
    cursor: pointer;
    background-color: rgb(25 27 29);
    user-select: none;
    &:hover {
        background-color: #232629;
    }
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const Description = styled.div`
    flex-direction: column;
    width: 80%;
`;