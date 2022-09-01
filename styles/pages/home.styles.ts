import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  main: {
    padding: "2rem 0"
  },
  searchWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 30,
    [theme.breakpoints.down('xs')]: {
      flexDirection: "column"
    }
  },
  listTitle: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center"
  },
  listGrid: {
    display: "grid",
    gridTemplateColumns: "auto auto auto",
    gap: 20,
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: "auto auto"
    },
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: "auto"
    }
  },
  noData: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 400,
    flexDirection: "column"
  },
  noDataIcon: {
    fontSize: 120,
    marginBottom: 20
  }
}))