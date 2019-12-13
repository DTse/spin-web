import React, { FC, useRef } from "react";
import { BrowserRouter } from "react-router-dom";

import clsx from "clsx";

import CssBaseline from "@material-ui/core/CssBaseline";

import Header from "components/Header";
import Sidebar from "components/Sidebar";
import Routes from "routes/Routes";

import { useAppContext } from "contexts/AppContext";

import { useAppStyles } from "./useAppStyles";

const App: FC = () => {
  const classes = useAppStyles();
  const { state } = useAppContext();

  const mainElRef = useRef<HTMLInputElement | null>(null);
  return (
    <BrowserRouter>
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        <main
          ref={mainElRef}
          className={clsx(classes.content, {
            [classes.contentShift]: state.open
          })}
        >
          <Sidebar containerRef={mainElRef} />
          <div className={classes.drawerHeader} />
          <Routes />
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
