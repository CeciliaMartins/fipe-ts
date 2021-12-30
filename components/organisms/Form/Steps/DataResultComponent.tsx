//atoms
import CardComponent from "components/atoms/Card/CardComponent";
import TitleComponent from "components/atoms/Title/TitleComponent";
import SubTitleComponent from "components/atoms/SubTitle/SubTitleComponent";

//molecules
import ListItemInfo from "components/molecules/ListItemInfo/ListItemInfo";

//interfaces
import { IResponseInfoResult } from "interfaces/IResponseInfoResult";

//material-ui
import { Button, List } from "@mui/material";

function DataResultComponent({ valuesResult, setShowResultCard }:
    { valuesResult?: IResponseInfoResult, setShowResultCard: (value: boolean) => void }) {

    const backStep = () => {
        setShowResultCard(false);
    }
    return (
        <>
            <CardComponent  >
                <TitleComponent description="Tabela Fipe" />
                <SubTitleComponent description={valuesResult?.title} />
                <List sx={{ width: '100%', maxWidth: 360 }} >
                    <ListItemInfo infos={valuesResult?.infos} />
                </List>
                <Button fullWidth variant="contained" onClick={() => {
                    backStep()

                }}>Voltar</Button>
            </CardComponent>
        </>
    )
}

export default DataResultComponent;