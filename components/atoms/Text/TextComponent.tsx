import styled from "styled-components";

const Text = styled.div<Props>`
font-size: ${props => props.fontSize != undefined ? props.fontSize : '20px'};
color: ${props => props.color != undefined ? props.color : '#4443bc'};
font-weight: bold;
margin-top: 6%;
margin-bottom: 3%;
text-align: ${props => props.textAlign != undefined ? props.textAlign : 'center'};
@media(max-width: 700px) {
  font-size: 10px;
} `;
type Props = {

  description?: string,
  color?: string,
  fontSize?: string,
  textAlign?: string

}
function TextComponent({ description, color, fontSize, textAlign }: Props) {

  return (
    <>
      <Text color={color} fontSize={fontSize} textAlign={textAlign}>{description}</Text>

    </>
  )

}

export default TextComponent;