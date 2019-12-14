import React, { createContext, useReducer, useContext, FC } from "react";

const AppContext = createContext<any>(null);

const useAppContext = () => useContext(AppContext);

interface State {
  open: boolean;
  entries: Array<any>;
}

type Action =
  | { type: "reset" }
  | { type: "setOpen"; value: boolean }
  | { type: "setEntries"; value: Array<any> };

// Initial app state
let initialState: any = {
  open: false,
  entries: [] as any[]
};

/**
 * useReducer returns a callback  that updates the state.
 * @param {string} state
 * @param {object} action
 * @return {any}
 **/

let reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "reset":
      return initialState;
    case "setOpen":
      return { ...state, open: action.value };
    case "setEntries":
      return { ...state, entries: action.value };
    default:
      return state;
  }
};

/**
 * Context provider.
 * @param {object} props
 * @return {any}
 **/

type ACPProps = { children: any };

const AppContextProvider: FC<ACPProps> = ({ children }): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppContextProvider, useAppContext };
