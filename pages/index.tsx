import SelectComponent from "../components/Select/SelectComponent";
import React from "react";
import { Divider, Button, List, ListItem, Grid, Typography, ListItemText, Avatar, ListItemAvatar } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { ISelectOptions } from "../interfaces/ISelectOptions";
import styled from "styled-components";
import { FipeService } from '../services/index'
import { IValuesVehicle } from "interfaces/IValuesVehicle";

export const Container = styled.div`
 display: flex;
    align-items: center;
    justify-content: center;
    margin: 5%;
  
`;

function Fipe({ brands }: { brands: Array<ISelectOptions> }) {
  const filters: Array<ISelectOptions> = [
    { value: "carros", label: "Carros" },
    { value: "motos", label: "Motos" },
    { value: "caminhoes", label: "Caminhoes" },
  ];
  const [brandsOptions, setBrandsOptions] = React.useState<Array<ISelectOptions> | []>(brands);
  const [modelsOptions, setModelsOptions] = React.useState([]);
  const [yearsOptions, setYearsOptions] = React.useState([]);
  const [brand, setBrand] = React.useState("");
  const [model, setModel] = React.useState("");
  const [year, setYear] = React.useState("");
  const [valuesVehicle, setValuesVehicle] = React.useState<IValuesVehicle | undefined>({});
  const [loading, setLoading] = React.useState(false);
  const [filter, setFilter] = React.useState("carros");
  const [showResultCard, setShowResultCard] = React.useState(false);

  const loadBrands = async (typeVehicle: string) => {
    const data = await FipeService.loadBrandsService(typeVehicle);
    setBrandsOptions(data);
  };

  const loadModelsAndYears = async (brand: string) => {
    setLoading(true);
    const dataModels = await FipeService.loadModelsAndYearsService(brand, filter);
    setModelsOptions(dataModels);
    setLoading(false);
  };

  const loadYears = async (model: string) => {
    const dataYears = await FipeService.loadYearsService(filter, brand, model);
    setYearsOptions(dataYears);
  };

  const loadPriceVehicles = async (year: string) => {
    const data: IValuesVehicle = await FipeService.loadPriceVehiclesService(filter, brand, model, year);
    setValuesVehicle(data);
  };

  const clearFields = () => {
    setModel("");
    setYear("");
    setBrand("");
    setValuesVehicle({});
    setBrandsOptions([]);
    setModelsOptions([]);
    setYearsOptions([]);
  };

  const handleChangeBrand = (value: string) => {
    setBrand(value);
    loadModelsAndYears(value);
  };

  const handleClickFilter = (value: string) => {
    console.log(value);
    clearFields();
    setFilter(value);
    loadBrands(value);
  };

  const handleChangeModel = (value: string) => {
    setModel(value);
    loadYears(value);
  };

  const handleChangeYear = (value: string) => {
    setYear(value);
    loadPriceVehicles(value);
  };

  const showResult = () => {
    setShowResultCard(true);
  }

  const back = () => {
    setFilter("carros");
    loadBrands("carros");
    clearFields();
    setShowResultCard(false);
  }

  const ContainerMain = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5%;
    `;

  const Title = styled.div`
    font-size: 40px;
    font-weight: bold;
    line-height: 1;
    color: rgb(66, 66, 66);
    width: 100%;
    text-align: center;
    margin-bottom: 2%;
    `;
  const SubTitle = styled.div`
    font-size: 30px;
    font-weight: bold;
    line-height: 1;
    color: rgb(66, 66, 66);
    width: 100%;
    text-align: center;
    margin-bottom: 2%;
    `;

  const Card = styled.div`
    height: 75vh;
    width: 50vw;
    background: white;
    padding: 30px;
    border-radius: 4px;
    margin-bottom: 24px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    @media only screen and (max-width: 700px) {
      width: 90vw;
    height: 90vh;
    margin-bottom: 14px;
    padding: 10px;
    }
    `;

  const Text = styled.div`
    font-size: 20px;
    color: #4443bc;
    font-weight: bold;
    margin-top: 6%;
    margin-bottom: 3%;
    text-align: center;
    `;

  return (
    <ContainerMain>
      <Stack spacing={1} alignItems="center">
        {showResultCard == false ? (
          <Card>
            <Title>Tabela Fipe de Carros </Title>
            <SubTitle>Consulte um valor de um carro de forma gratuita </SubTitle>
            <Text>Qual veículo você gostaria de comprar ou vender?</Text>
            <Stack spacing={1} alignItems="center" marginBottom={4}>
              <Stack direction="row" spacing={1}>
                {filters.map((ftr: ISelectOptions, i: number) => (
                  <Chip
                    key={i}
                    label={ftr.label}
                    color="primary"
                    size="medium"
                    variant={ftr.value == filter ? undefined : "outlined"}
                    onClick={() => {
                      handleClickFilter(ftr.value);
                    }}
                  />
                ))}
              </Stack>
            </Stack>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              margin={2}
              alignItems="center"
            >
              <SelectComponent
                label="Marca"
                value={brand}
                options={brandsOptions}
                handleChange={(e) => {
                  handleChangeBrand(e.target.value);
                }}
                minWidth={350}
                margin={1}
              />
              <SelectComponent
                label="Modelo"
                value={model}
                options={modelsOptions}
                handleChange={(e) => {
                  handleChangeModel(e.target.value);
                }}
                minWidth={350}
                msgNone="Seleciona uma marca"
                margin={1}
              />

              <SelectComponent
                label="Ano"
                value={year}
                options={yearsOptions}
                handleChange={(e) => {
                  handleChangeYear(e.target.value);
                }}
                minWidth={350}
                msgNone="Seleciona um modelo e uma marca"
                margin={1}
              />
            </Grid>
            <Stack margin={3} alignItems="center">
              <Button variant="contained" onClick={() => { showResult() }}>Consultar Preço</Button>
            </Stack>
          </Card>
        ) : (
          <Card>
            <Title>Tabela Fipe </Title>
            <SubTitle>{valuesVehicle?.brand}, {valuesVehicle?.model} - Ano {valuesVehicle?.yearModel}  </SubTitle>
            <h3>Ficha técnica:</h3>
            <List sx={{ width: '100%', maxWidth: 360 }} >
              <ListItem alignItems="flex-start">
                <ListItemAvatar >
                  <Avatar alt="Remy Sharp"  > <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="subtitle1"
                    color="primary">P</Typography></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Preço"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="subtitle1"
                        color="primary"
                      >
                        {valuesVehicle?.price}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp"  > <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="subtitle1"
                    color="primary"
                  >C</Typography></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Combustível:"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="subtitle1"
                        color="primary"
                      >
                        {valuesVehicle?.fuel}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp"  > <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="subtitle1"
                    color="primary"
                  >M</Typography></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Mês de referência"
                  color="primary"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="subtitle1"
                        color="primary"
                      >
                        {valuesVehicle?.mounthReference}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
            <Button fullWidth variant="contained" onClick={() => { back() }}>Voltar</Button>
          </Card>
        )
        }

      </Stack>
    </ContainerMain >
  );
}
export const getServerSideProps = async () => {
  const brands = await FipeService.loadBrandsService("carros");
  return { props: { brands } };
};
export default Fipe;
