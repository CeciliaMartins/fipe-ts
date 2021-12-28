import styled from "styled-components";

const SubTitle = styled.div`
font-size: 30px;
font-weight: bold;
line-height: 1;
color: rgb(66, 66, 66);
width: 100%;
text-align: center;
margin-bottom: 2%;
@media(max-width: 700px) {
  font-size: 20px;
}`;


type Props = {
    description?: string
}
function SubTitleComponent({ description }: Props) {
    return (
        <>
            <SubTitle>{description}</SubTitle>
        </>
    )
}

export default SubTitleComponent;