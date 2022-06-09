import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { citiesApi, streetsApi } from "../API/ApiFetch";
import Streets from "./Streets";

const AutoCompleteComponent = () => {
  const [cities, setCities] = useState([]);
  const [streets, setStreets] = useState([]);
  const [page, setPage] = useState(0);

  const getCityData = () => {
    citiesApi().then((res) => {
      setCities(res?.data.data);
    });
  };

  const getStreetData = (event, value) => {
    streetsApi(value.code).then((res) => {
      setStreets(res.data.data);
      setPage(0);
    });
  };

  const mapStreets = streets
    .slice(page * 40, page * 40 + 40)
    .map((street, index) => {
      return <Streets streets={street.street} key={index} />;
    });

  useEffect(() => {
    getCityData();
  }, []);

  const mapCities = cities.map((city, index) => {
    return { label: city.cityHe, code: city.code };
  });

  const prev = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const next = () => {
    if (streets.length / 40 > page) {
      setPage(page + 1);
    }
  };

  return (
    <div>
      <div className='autoComplete'>
        <Autocomplete
          autoSelect
          id={"u"}
          options={mapCities}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label='City' />}
          onChange={getStreetData}
        />
      </div>
      <div className='container-streets'>{mapStreets}</div>
      <div className='container-btn'>
        <button onClick={prev} className='btn'>
          Prev
        </button>
        <div className='page'>{page + 1}</div>
        <button onClick={next} className='btn'>
          next
        </button>
      </div>
    </div>
  );
};

export default AutoCompleteComponent;
