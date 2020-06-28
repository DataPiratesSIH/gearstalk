import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
  button: {
    marginTop: "5px",
    marginLeft: "5px",
    width: "100%",
    textTransform: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 500,
    padding: "4px 10px",
    border: "1px solid #2bd1e1",
  },
}));

const QueryField: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = useState<string>("");

  const handleChange: (event: any) => void = (event) => {
    setValue(event.target.value);
  };

  return (
    <React.Fragment>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            id="outlined-multiline-static"
            label="Type your query"
            multiline
            rows="4"
            fullWidth
            variant="outlined"
            value={value}
            onChange={handleChange}
          />
        </div>
      </form>
      <Grid container spacing={1}>
        <Grid item sm={11} xs={10}>
          <Button
            className={classes.button}
            endIcon={<Icon>send</Icon>}
          >
            SEND
          </Button>
        </Grid>
        <Grid item sm={1} xs={2}>
          <IconButton aria-label="voice">
            <KeyboardVoiceIcon color="primary" />
          </IconButton>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default QueryField;
