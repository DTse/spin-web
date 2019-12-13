import React, { memo, FC } from "react";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";

import clsx from "clsx";

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";

import HomeIcon from "@material-ui/icons/Home";

import { useSidebarStyles } from "./useSidebarStyles";

import { useAppContext } from "contexts/AppContext";

interface DrawerProps {
  containerRef: any;
}

/**
 * Return the Drawer Component.
 * @param {object} history
 * @return {any}
 **/

const Sidebar: FC<RouteComponentProps & DrawerProps> = ({
  history,
  containerRef
}: any): JSX.Element => {
  const classes = useSidebarStyles();
  const { state } = useAppContext();
  return (
    <Drawer
      variant="persistent"
      open={true}
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: state.open,
        [classes.drawerClose]: !state.open
      })}
      classes={{
        paper: clsx(classes.drawerPaper, {
          [classes.drawerOpen]: state.open,
          [classes.drawerClose]: !state.open
        })
      }}
      ModalProps={{
        container: containerRef.current,
        disablePortal: true,
        hideBackdrop: true
      }}
    >
      <List>
        <ListItem button onClick={() => history.push("/")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default memo(withRouter(Sidebar));
