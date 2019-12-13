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

interface IDrawerProps {
  containerRef: any;
  open: boolean;
}

/**
 * Return the Drawer Component.
 * @param {object} history
 * @return {any}
 **/

const Sidebar: FC<RouteComponentProps & IDrawerProps> = ({
  history,
  containerRef,
  open
}: any): JSX.Element => {
  const classes = useSidebarStyles();

  return (
    <Drawer
      variant="persistent"
      open={true}
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open
      })}
      classes={{
        paper: clsx(classes.drawerPaper, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
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
