import axios from "axios";
import { IResponseBrand } from "../interfaces/IResponseBrand";
import { IResponseModel } from "../interfaces/IResponseModel";
import { IResponseYear } from "../interfaces/IResponseYear";
import { IValuesVehicle } from "../interfaces/IValuesVehicle";

const domain = process.env.HOST;

export const loadBrandsService = async (typeVehicle: string) => {
  const res = await axios.get(`${domain}/${typeVehicle}/marcas`);

  const data = res.data.length > 0 ? res.data.map((x: IResponseBrand) => ({
    value: x.codigo,
    label: x.nome,
  })) : [];
  return data;
};

export const loadModelsAndYearsService = async (brand: string, filter: string) => {

  const res = await axios.get(
    `${domain}/${filter}/marcas/${brand}/modelos`
  );
  const dataModels = res.data.modelos.length > 0 ? res.data.modelos.map((x: IResponseModel) => ({
    value: x.codigo,
    label: x.nome,
  })) : [];
  return dataModels;
};

export const loadYearsService = async (filter: string, brand: string, model: string) => {
  const res = await axios.get(
    `${domain}/${filter}/marcas/${brand}/modelos/${model}/anos`
  );

  const dataYears = res.data.length > 0 ? res.data.map((x: IResponseYear) => ({
    value: x.codigo,
    label: x.nome,
  })) : [];
  return dataYears;
};

export const loadPriceVehiclesService = async (filter: string, brand: string, model: string, year: string,) => {
  const res = await axios.get(
    `${domain}/${filter}/marcas/${brand}/modelos/${model}/anos/${year}`
  );
  const data = res.data;
  const values: IValuesVehicle = {
    price: data.Valor,
    brand: data.Marca,
    model: data.Modelo,
    yearModel: data.AnoModelo,
    fuel: data.Combustivel,
    codeFipe: data.CodigoFipe,
    mounthReference: data.MesReferencia,
    typeVehicle: data.TipoVeiculo,
    acronymFuel: data.SiglaCombustivel,
  };
  return values;

};
