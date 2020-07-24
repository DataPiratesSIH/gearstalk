import React from "react";
import { Link, Button, makeStyles } from "@material-ui/core";
import { FaWindows } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  windowsButton: {
    color: "#fff",
    backgroundColor: "#291ec9",
    "&:hover": {
      backgroundColor: "#1e15a1",
    },
  },
}));

const DownloadButton: React.FC = () => {
  const classes = useStyles();
  return (
    <Link
      href="https://github.com/DataPiratesSIH/gearstalk-app/releases/download/v1.0.0/gearstalk-app-Setup-1.0.0.exe"
      underline="none"
    >
      <Button
        variant="contained"
        className={classes.windowsButton}
        startIcon={<FaWindows />}
      >
        DOWNLOAD FOR WINDOWS
      </Button>
    </Link>
  );
};

export default DownloadButton;
