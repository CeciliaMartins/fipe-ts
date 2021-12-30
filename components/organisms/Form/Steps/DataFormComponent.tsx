import React, { useEffect } from "react";

//atoms
import SelectComponent from "components/atoms/Select/SelectComponent";
import CardComponent from "components/atoms/Card/CardComponent";
import TitleComponent from "components/atoms/Title/TitleComponent";
import SubTitleComponent from "components/atoms/SubTitle/SubTitleComponent";
import TextComponent from "components/atoms/Text/TextComponent";

//molecules
import LoadingComponent from "components/molecules/Loading/Loading";

//material-ui
import { Button, Grid, Chip, Stack } from "@mui/material";

//services
import { FipeService } from 'services/index'

//interfaces
import { ISelectOptions } from "interfaces/ISelectOptions";
import { IValuesVehicle } from "interfaces/IValuesVehicle";
import { IResponseInfoResult } from "interfaces/IResponseInfoResult"


function DataFormComponent({ setShowResultCard, setInfosResult }: { setShowResultCard: (value: boolean) => void, setInfosResult: (value: IResponseInfoResult) => void }) {
    useEffect(() => {
        async function loadInitialBrands() {
            const brands = await FipeService.loadBrandsService("carros");
            setBrandsOptions(brands);
        }

        loadInitialBrands()
    }, []);

    const [brandsOptions, setBrandsOptions] = React.useState<Array<ISelectOptions> | []>([]);
    const [modelsOptions, setModelsOptions] = React.useState([]);
    const [yearsOptions, setYearsOptions] = React.useState([]);
    const [year, setYear] = React.useState("");
    const [brand, setBrand] = React.useState("");
    const [model, setModel] = React.useState("");
    const [filter, setFilter] = React.useState("carros");
    const [isDisabled, setDisabledButton] = React.useState(true);
    const [loading, setLoading] = React.useState<boolean | undefined>(false);
    const [opacityCard, setOpacity] = React.useState(false);

    let brandRef = React.useRef("");
    let modelRef = React.useRef("");
    let yearRef = React.useRef("");

    const loadBrands = async (typeVehicle: string) => {
        showLoading(true);
        const data = await FipeService.loadBrandsService(typeVehicle);
        setBrandsOptions(data);
        showLoading(false);

    };

    const showLoading = (value: boolean) => {
        setLoading(value);
        setOpacity(value);
    }

    const loadModelsAndYears = async (brand: string) => {
        showLoading(true);
        const dataModels = await FipeService.loadModelsAndYearsService(brand, filter);
        setModelsOptions(dataModels);
        showLoading(false);
    };

    const loadYears = async (model: string) => {
        showLoading(true);
        const dataYears = await FipeService.loadYearsService(filter, brand, model);
        setYearsOptions(dataYears);
        showLoading(false);
    };

    const handleClickFilter = (value: string) => {
        clearFields();
        setFilter(value);
        loadBrands(value);
        EnableButton();
    };
    const EnableButton = () => {
        const isValueBrand = brandRef.current != undefined && brandRef.current != "" ? true : false;
        const isValueModel = modelRef.current != undefined && modelRef.current != "" ? true : false;
        const isValueYear = yearRef.current != undefined && yearRef.current != "" ? true : false;
        if (isValueBrand && isValueModel && isValueYear) setDisabledButton(false);
        else setDisabledButton(true);
    }


    const handleChangeBrand = (value: string) => {
        brandRef.current = value;
        setBrand(value);
        loadModelsAndYears(value);
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

    const loadPriceVehicles = async () => {
        const data: IValuesVehicle = await FipeService.loadPriceVehiclesService(filter, brand, model, year);
        const infos: IResponseInfoResult = {
            title: `${data?.brand}, ${data?.model} - Ano ${data?.yearModel}`,
            infos: [
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
        }
        return infos;
    };

    const showNextStep = async () => {
        showLoading(true);
        const infos: IResponseInfoResult = await loadPriceVehicles();
        setInfosResult(infos);
        showLoading(false);
        setShowResultCard(true);
    }
    const filters: Array<ISelectOptions> = [
        { value: "carros", label: "Carros" },
        { value: "motos", label: "Motos" },
        { value: "caminhoes", label: "Caminhoes" },
    ];




    return (
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
                    <Button variant="contained" onClick={() => {
                        showNextStep();
                    }} disabled={isDisabled}>Consultar Preço</Button>
                </Stack>
            </CardComponent>
        </>
    )
}
export default DataFormComponent;