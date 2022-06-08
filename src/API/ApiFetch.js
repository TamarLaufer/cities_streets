import axios from "axios";
import Urls from "./Urls";

export function citiesApi() {
  return axios.get(Urls.citiesUrl());
}

export function streetsApi(id) {
  return axios.get(Urls.streetsUrl(id));
}
