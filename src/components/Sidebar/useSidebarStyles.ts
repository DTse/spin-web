import { makeStyles, Theme } from "@material-ui/core/styles";

const drawerWidth = 240;

export const useSidebarStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 0,
    whiteSpace: "nowrap"
  },
  drawerPaper: {
    transform: "none",
    width: drawerWidth,
    marginTop: 97,
    marginLeft: 30,
    "-webkit-box-shadow": "10px 15px 30px 1px rgba(0,0,0,.1)",
    boxShadow: "10px 15px 30px 1px rgba(0,0,0,.1)"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    justifyContent: "flex-end",
    ...theme.mixins.toolbar
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7) + 2
    }
  },
  toolbar: theme.mixins.toolbar
}));
