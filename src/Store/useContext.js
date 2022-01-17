import React from "react";
import { Context } from "./Context";

const useContext = () => {
  const { state, setState } = React.useContext(Context);

  return { state, setState };
};

export default useContext;