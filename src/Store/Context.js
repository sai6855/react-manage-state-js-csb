import React from "react";
import { createContext, useProvider } from "react-manage-state";
import { defaultState } from "./defaultStore";

export const Context = createContext(defaultState);

const Provider = ({ children }) => {
  const { state, setState } = useProvider(defaultState);

  return (
    <Context.Provider value={{ state, setState }}>{children}</Context.Provider>
  );
};

export default Provider;