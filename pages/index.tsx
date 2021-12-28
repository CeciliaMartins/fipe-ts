import React from "react";
import styled from "styled-components";

//atoms
import SelectComponent from "../components/atoms/Select/SelectComponent";
import CardComponent from "../components/atoms/Card/CardComponent";
import TitleComponent from "../components/atoms/Title/TitleComponent";
import SubTitleComponent from "../components/atoms/SubTitle/SubTitleComponent";
import TextComponent from "components/atoms/Text/TextComponent";

//molecules
import ListItemInfo from "../components/molecules/ListItemInfo/ListItemInfo";
import LoadingComponent from "../components/molecules/Loading/Loading";

//material-ui
import { Button, List, Grid, Chip, Stack } from "@mui/material";

//interfaces
import { ISelectOptions } from "../interfaces/ISelectOptions";
import { IValuesVehicle } from "interfaces/IValuesVehicle";
import { IInfosResult } from "interfaces/IInfosResult";

//services
import { FipeService } from '../services/index'

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

  const [loading, setLoading] = React.useState<boolean | undefined>(false);
  const [opacityCard, setOpacity] = React.useState(false);
  const [filter, setFilter] = React.useState("carros");
  const [showResultCard, setShowResultCard] = React.useState(false);
  const [isDisabled, setDisabledButton] = React.useState(true);
  const [valuesResult, setInfosResult] = React.useState<Array<IInfosResult> | undefined>([]);
  const [titleInfos, setTitleInfos] = React.useState<string | undefined>("");

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
    setLoading(false);
    setOpacity(false);

    const title: string = `${data?.brand}, ${data?.model} - Ano ${data?.yearModel}`;
    setTitleInfos(title);
    const infos: Array<IInfosResult> = [
      {
        firstLetter: 'P',
        titlePrimary: 'Preço',
        value: data.price
      },
      {
        firstLetter: 'C',
        titlePrimary: 'Combustível',
        value: data.fuel
      },
      {
        firstLetter: 'M',
        titlePrimary: 'Mês de referência',
        value: data.mounthReference
      }
    ]
    setInfosResult(infos);
  };

  const clearFields = () => {
    brandRef.current = "";
    modelRef.current = "";
    yearRef.current = "";
    setModel("");
    setYear("");
    setBrand("");
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
  justify - content: center;
  margin: 5%;
  `;
  return (
    <ContainerMain>
      <Stack spacing={1} alignItems="center">
        {showResultCard == false ? (
          <>
            <LoadingComponent loading={loading} />
            <CardComponent opacityCard={opacityCard}>
              <TitleComponent description="Tabela Fipe de Carros" />
              <SubTitleComponent description="Consulte um valor de um carro de forma gratuita" />
              <TextComponent description="Qual veículo você gostaria de comprar ou vender?" />
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
            </CardComponent>
          </>
        ) : (
          <CardComponent >
            <TitleComponent description="Tabela Fipe" />
            <SubTitleComponent description={titleInfos} />
            <List sx={{ width: '100%', maxWidth: 360 }} >
              <ListItemInfo infos={valuesResult} />
            </List>
            <Button fullWidth variant="contained" onClick={() => { back() }}>Voltar</Button>
          </CardComponent>
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
