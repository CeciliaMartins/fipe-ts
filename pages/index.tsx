import SelectComponent from "../components/Select/SelectComponent";
import React from "react";
import { Box, CircularProgress, Divider, Button, List, ListItem, Grid, Typography, ListItemText, Avatar, ListItemAvatar } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { ISelectOptions } from "../interfaces/ISelectOptions";
import styled from "styled-components";
import { FipeService } from '../services/index'
import { IValuesVehicle } from "interfaces/IValuesVehicle";

function Fipe({ brands }: { brands: Array<ISelectOptions> }) {
  const filters: Array<ISelectOptions> = [
    { value: "carros", label: "Carros" },
    { value: "motos", label: "Motos" },
    { value: "caminhoes", label: "Caminhoes" },
  ];
  const [brandsOptions, setBrandsOptions] = React.useState<Array<ISelectOptions> | []>(brands);
  const [modelsOptions, setModelsOptions] = React.useState([]);
  const [yearsOptions, setYearsOptions] = React.useState([]);
  const [model, setModel] = React.useState("");
  const [year, setYear] = React.useState("");



  const [valuesVehicle, setValuesVehicle] = React.useState<IValuesVehicle | undefined>({});
  const [loading, setLoading] = React.useState(false);
  const [opacityCard, setOpacity] = React.useState(false);
  const [filter, setFilter] = React.useState("carros");
  const [showResultCard, setShowResultCard] = React.useState(false);
  const [isDisabled, setDisabledButton] = React.useState(true);

  const [brand, setBrand] = React.useState("");
  let brandRef = React.useRef("");
  let modelRef = React.useRef("");
  let yearRef = React.useRef("");


  const loadBrands = async (typeVehicle: string) => {
    setLoading(true);
    setOpacity(true);
    const data = await FipeService.loadBrandsService(typeVehicle);
    setBrandsOptions(data);
    setLoading(false);
    setOpacity(false);
  };

  const loadModelsAndYears = async (brand: string) => {
    setLoading(true);
    setOpacity(true);
    const dataModels = await FipeService.loadModelsAndYearsService(brand, filter);
    setModelsOptions(dataModels);
    setLoading(false);
    setOpacity(false);

  };

  const loadYears = async (model: string) => {
    setLoading(true);
    setOpacity(true);
    const dataYears = await FipeService.loadYearsService(filter, brand, model);
    setYearsOptions(dataYears);
    setLoading(false);
    setOpacity(false);
  };

  const loadPriceVehicles = async (year: string) => {
    setLoading(true);
    setOpacity(true);
    const data: IValuesVehicle = await FipeService.loadPriceVehiclesService(filter, brand, model, year);
    setValuesVehicle(data);
    setLoading(false);
    setOpacity(false);
  };

  const clearFields = () => {
    brandRef.current = "";
    modelRef.current = "";
    yearRef.current = "";
    setModel("");
    setYear("");
    setBrand("");
    setValuesVehicle({});
    setBrandsOptions([]);
    setModelsOptions([]);
    setYearsOptions([]);
  };

  const handleChangeBrand = (value: string) => {
    brandRef.current = value;
    setBrand(value);
    loadModelsAndYears(value);
    EnableButton();
  };

  const handleClickFilter = (value: string) => {
    clearFields();
    setFilter(value);
    loadBrands(value);
    EnableButton();


  };

  const handleChangeModel = (value: string) => {
    modelRef.current = value;
    setModel(value);
    loadYears(value);
    EnableButton();
  };

  const handleChangeYear = (value: string) => {
    yearRef.current = value;
    setYear(value);
    EnableButton();
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
    EnableButton();
  }

  const EnableButton = () => {
    const isValueBrand = brandRef.current != undefined && brandRef.current != "" ? true : false;
    const isValueModel = modelRef.current != undefined && modelRef.current != "" ? true : false;
    const isValueYear = yearRef.current != undefined && yearRef.current != "" ? true : false;
    if (isValueBrand && isValueModel && isValueYear) setDisabledButton(false);
    else setDisabledButton(true);
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
    @media(max-width: 700px) {
      font-size: 30px;

  }
    `;
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

  }
    `;

  const Card = styled.div`
    padding: 30px;
    border-radius: 4px;
    margin-bottom: 24px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    background:  ${opacityCard == true ? '#ebebeb' : 'white'};
    opacity = ${opacityCard == true ? 0.1 : 1};
    pointer-events: ${opacityCard == true ? 'none' : ''};

  @media(max-width: 700px) {
    width: 95%;
    height: 95%;
    padding: 10px;
    margin-bottom: 2px;
  }
  `;

  const Text = styled.div`
  font-size: 20px;
  color: #4443bc;
  font-weight: bold;
  margin-top: 6%;
  margin-bottom: 3%;
  text-align: center;
  @media(max-width: 700px) {
      font-size: 10px;

  }
  `;

  return (
    <ContainerMain>
      <Stack spacing={1} alignItems="center">
        {showResultCard == false ? (
          <>
            {loading == true ? (
              <Box sx={{
                zIndex: 1,
                position: 'absolute',
                width: '100%',
                height: '200px',
              }}>
                <CircularProgress sx={{
                  color: '#00c5ff',
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '200px',
                  marginLeft: '50%',
                }} />
              </Box>
            ) : ""}
            <Card >
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
                      }} />
                  ))}
                </Stack>
              </Stack>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                margin={{ xs: 0, md: 2 }}
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
                />
              </Grid>
              <Stack margin={3} alignItems="center">
                <Button variant="contained" onClick={() => { showResult(); }} disabled={isDisabled}>Consultar Preço</Button>
              </Stack>
            </Card></>
        ) : (
          <Card>
            <Title>Tabela Fipe</Title>
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
