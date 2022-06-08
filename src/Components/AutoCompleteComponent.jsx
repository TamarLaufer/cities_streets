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
      console.log("res:", res?.data.data);
    });
  };

  const getStreetData = (event, value) => {
    console.log(event);
    console.log(value);
    streetsApi(value.code).then((res) => {
      setStreets(res.data.data);
      setPage(0);
    });
  };

  const mapStreets = streets.slice(page * 50, page * 50 + 50).map((street) => {
    return <Streets streets={street.street} />;
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
    if (streets.length / 50 > page) {
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
        <div className='page'>{page}</div>
        <button onClick={next} className='btn'>
          next
        </button>
      </div>
    </div>
  );
};

export default AutoCompleteComponent;
