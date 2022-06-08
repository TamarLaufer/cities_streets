import React, { Fragment, useEffect, useState } from "react";
import AutoCompleteComponent from "./AutoCompleteComponent";

const Home = () => {
  return (
    <Fragment>
      <div className='container-home'>
        <AutoCompleteComponent />
      </div>
    </Fragment>
  );
};

export default Home;
