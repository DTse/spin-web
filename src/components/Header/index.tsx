import React, { memo, FC } from "react";
import { useAppContext } from "contexts/AppContext";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import MenuIcon from "@material-ui/icons/Menu";

import { useHeaderStyles } from "./useHeaderStyles";

/**
 * Return the App Bar component.
 * @param {any} location
 * @return {JSX.Element} <Header>
 **/

const Header: FC<RouteComponentProps> = ({ location }: any): JSX.Element => {
  const classes = useHeaderStyles();
  const { state, dispatch } = useAppContext();

  const title = location.pathname.replace(/\//g, "");

  const handleDrawerToggle = (): void =>
    dispatch({ type: "setOpen", value: !state.open });

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          edge="start"
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography className={classes.headerTitle} variant="h1" noWrap>
          {title ? title : "Home"}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default memo(withRouter(Header));
