import SelectComponent from "../components/Select/SelectComponent";
import React from "react";
import { Button, Box, CircularProgress, Grid } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { IValuesVehicle } from "../interfaces/IValuesVehicle";
import { ISelectOptions } from "../interfaces/ISelectOptions";
import { IResponseBrand } from "../interfaces/IResponseBrand";
import { IResponseYear } from "../interfaces/IResponseYear";
import { IResponseModel } from "../interfaces/IResponseModel";
import styled from "styled-components";

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
  const [brandsOptions, setBrandsOptions] = React.useState(brands);
  const [modelsOptions, setModelsOptions] = React.useState([]);
  const [yearsOptions, setYearsOptions] = React.useState([]);
  const [brand, setBrand] = React.useState("");
  const [model, setModel] = React.useState("");
  const [year, setYear] = React.useState("");
  const [valuesVehicle, setValuesVehicle] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const [filter, setFilter] = React.useState("carros");

  const loadBrands = async (typeVehicle: string) => {
    const res = await axios.get(
      ` https://parallelum.com.br/fipe/api/v1/${typeVehicle}/marcas`
    );
    const data = res.data.map((x: IResponseBrand) => ({
      value: x.codigo,
      label: x.nome,
    }));
    setBrandsOptions(data);
  };

  const loadModelsAndYears = async (brand: string) => {
    setLoading(true);

    const res = await axios.get(
      ` https://parallelum.com.br/fipe/api/v1/${filter}/marcas/${brand}/modelos`
    );
    const dataModels = res.data.modelos.map((x: IResponseModel) => ({
      value: x.codigo,
      label: x.nome,
    }));
    setModelsOptions(dataModels);
    setLoading(false);
  };

  const loadYears = async (model: string) => {
    const res = await axios.get(
      `https://parallelum.com.br/fipe/api/v1/${filter}/marcas/${brand}/modelos/${model}/anos`
    );

    const dataYears = res.data.map((x: IResponseYear) => ({
      value: x.codigo,
      label: x.nome,
    }));

    setYearsOptions(dataYears);
  };

  const loadPriceVehicles = async (year: string) => {
    const res = await axios.get(
      `https://parallelum.com.br/fipe/api/v1/${filter}/marcas/${brand}/modelos/${model}/anos/${year}`
    );
    const data = res.data;

    const values: IValuesVehicle = {
      price: data.Valor,
      branch: data.Marca,
      model: data.Modelo,
      yearModel: data.AnoModelo,
      fuel: data.Combustivel,
      codeFipe: data.CodigoFipe,
      mounthReference: data.MesReferencia,
      typeVehicle: data.TipoVeiculo,
      acronymFuel: data.SiglaCombustivel,
    };

    setValuesVehicle(values);
  };

  const clearFields = () => {
    setModel("");
    setYear("");
    setValuesVehicle("");
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
          {/* {valuesVehicle.price || ''} */}
          <Stack margin={3} alignItems="center">
            <Button variant="contained">Consultar Preço</Button>
          </Stack>
          {loading ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CircularProgress />
            </Box>
          ) : (
            ""
          )}
        </Card>
      </Stack>
    </ContainerMain>
  );
}
export const getServerSideProps = async () => {
  const response = await axios.get(
    `https://parallelum.com.br/fipe/api/v1/carros/marcas`
  );
  let brands: Array<ISelectOptions> = [];
  if (response && response.data != undefined && response.data.length > 0) {
    const data = response.data.map((x: any) => ({
      value: x.codigo,
      label: x.nome,
    }));
    brands = await data;
  }
  return { props: { brands } };
};
export default Fipe;
