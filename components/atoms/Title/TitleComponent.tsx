import styled from "styled-components";

const Title = styled.div`
    font-size: 40px;
    font-weight: bold;
    line-height: 1;
    color: rgb(66, 66, 66);
    width: 100%;
    text-align: center;
    margin-bottom: 2%;
    @media(max-width: 700px) {
      font-size: 30px;

  }`;
type Props = {
    description: string
}
function TitleComponent({ description }: Props) {

    return (
        <>
            <Title>{description}</Title>
        </>
    )


}

export default TitleComponent;