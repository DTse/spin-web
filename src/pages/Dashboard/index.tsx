import React, { FC } from "react";

import { Grid, Paper } from "@material-ui/core";
import clsx from "clsx";

import { useDashboardStyles } from "./useDashboardStyles";
import { useAppContext } from "contexts/AppContext";

import FilterBar from "components/FilterBar";
import DataTable from "components/DataTable";
/**
 * Return the Dashboard page.
 * @return {any}
 **/

const Dashboard: FC = (): JSX.Element => {
  const classes = useDashboardStyles();
  const { state, dispatch } = useAppContext();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.gridItem}>
          <Paper
            className={clsx(classes.filterbar, {
              [classes.drawerOpen]: state.open,
              [classes.drawerClose]: !state.open
            })}
          >
            <FilterBar contextDispatch={dispatch} />
          </Paper>
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
          <Paper
            className={clsx(classes.table, {
              [classes.drawerOpen]: state.open,
              [classes.drawerClose]: !state.open
            })}
          >
            <DataTable state={state} dispatch={dispatch} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
