import React from "react";
import styled from "styled-components";

//organisms
import DataFormComponent from "./Steps/DataFormComponent";
import DataResultComponent from "./Steps/DataResultComponent";

//material-ui
import { Stack } from "@mui/material";

//interfaces
import { IResponseInfoResult } from "interfaces/IResponseInfoResult";

function FormComponent() {

    const [valuesResult, setInfosResult] = React.useState<IResponseInfoResult | undefined>({});
    const [showResultCard, setShowResultCard] = React.useState(false);

    const ContainerMain = styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 5%;
    `;

    return (
        <ContainerMain>
            <Stack spacing={1} alignItems="center">
                {showResultCard == false ? (
                    <>
                        <DataFormComponent
                            setShowResultCard={setShowResultCard}
                            setInfosResult={setInfosResult}
                        />
                    </>
                ) : (
                    <>
                        <DataResultComponent
                            valuesResult={valuesResult}
                            setShowResultCard={setShowResultCard}
                        />
                    </>
                )
                }

            </Stack>
        </ContainerMain >
    );
}

export default FormComponent;
