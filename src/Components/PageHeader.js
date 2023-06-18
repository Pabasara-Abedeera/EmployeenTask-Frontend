import { Paper, Card, Typography, makeStyles, Grid } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#edf4f7",
  },
  pageHeader: {
    padding: theme.spacing(5),
    display: "flex",
    marginBottom: theme.spacing(3),
    alignItems: "center",
  },
  pageIcon: {
    display: "inline-block",
    padding: theme.spacing(2),
    color: "#3c44b1",
  },
  pageTitle: {
    paddingLeft: theme.spacing(4),
  },
  img: {
    width: "50%",
    height: "50%",
  },
}));
export default function PageHeader(props) {
  const classes = useStyles();
  const { title, subTitle, icon } = props;
  return (
    <div>
      <Paper elevation={0} square className={classes.root}>
        <div className={classes.pageHeader}>
          <Card className={classes.pageIcon}>{icon}</Card>
          <div className={classes.pageTitle}>
            <Typography variant="h6" component="div">
              {title}
            </Typography>
            < Typography
              variant="subtitle2"
              component="div"
              style={{ opacity: "0.6" }}
            >
              {subTitle}
            </Typography>
          </div>
        </div>
      </Paper>
    </div>
  );
}
