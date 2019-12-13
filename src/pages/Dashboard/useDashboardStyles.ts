import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useDashboardStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: "100%",
      marginTop: 10
    },
    filterbar: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      "-webkit-box-shadow": "10px 15px 30px 1px rgba(0,0,0,.1)",
      boxShadow: "10px 15px 30px 1px rgba(0,0,0,.1)",
      minHeight: 60
    },
    table: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      "-webkit-box-shadow": "10px 15px 30px 1px rgba(0,0,0,.1)",
      boxShadow: "10px 15px 30px 1px rgba(0,0,0,.1)",
      minHeight: "300px"
    },
    gridItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end"
    },
    drawerOpen: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "calc( 100% - 280px)"
      }
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "calc( 100% - 100px )"
      }
    }
  })
);
