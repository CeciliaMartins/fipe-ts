import styled from "styled-components";

const Card = styled.div<Props>`
    padding: 30px;
    border-radius: 4px;
    margin-bottom: 24px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    background:  ${props => props.opacityCard == true ? '#ebebeb' : 'white'};
    opacity = ${props => props.opacityCard == true ? 0.1 : 1};
    pointer-events: ${props => props.opacityCard == true ? 'none' : ''};

    @media(max-width: 700px) {
        width: 95%;
        height: 95%;
        padding: 10px;
        margin-bottom: 2px;
    }`;

type Props = {
    opacityCard?: boolean;
    children: any
}


function CardComponent({ opacityCard, children }: Props) {
    return (
        <>
            <Card opacityCard={opacityCard} >{children}</Card>
        </>
    )
}

export default CardComponent;