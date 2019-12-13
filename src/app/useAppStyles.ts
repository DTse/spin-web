import { makeStyles, Theme } from "@material-ui/core/styles";

export const useAppStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    justifyContent: "flex-end",
    ...theme.mixins.toolbar
  },
  content: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    flexDirection: "column",
    padding: theme.spacing(3),
    position: "relative",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));
