import React from "react";
import { useAttribute } from "../context/attribute-context";
import AttributeList from "./AttributeList";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import SearchTabs from "./SearchTabs";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%",
  },
}));

const SearchGrid: React.FC = () => {
  const [{ attributes }, dispatch] = useAttribute();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xl={9} lg={9} md={9} xs={12} sm={12}>
          <Paper className={classes.paper} square>
            Video
          </Paper>
        </Grid>
        <Grid item xl={3} lg={3} md={3} xs={12} sm={12}>
          <Paper className={classes.paper} square>
            Features
          </Paper>
        </Grid>
        <Grid item xl={6} lg={6} md={6} xs={12} sm={12}>
          <Paper className={classes.paper} square>
            <AttributeList items={attributes} />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<PersonAddIcon />}
              onClick={() =>
                dispatch({
                  type: "addPerson",
                })
              }
            >
              Add Person
            </Button>
          </Paper>
        </Grid>
        <Grid item xl={6} lg={6} md={6} xs={12} sm={12}>
          <SearchTabs />
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchGrid;
