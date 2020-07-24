import React from "react";
import { Link, Button, makeStyles } from "@material-ui/core";
import { FaWindows, FaApple, FaLinux } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  windowsButton: {
    color: "#fff",
    backgroundColor: "#291ec9",
    "&:hover": {
      backgroundColor: "#1e15a1",
    },
    margin: "10px",
  },
  iosButton: {
    color: "#000",
    backgroundColor: "#d3d3d3",
    "&:hover": {
      backgroundColor: "#989a9c",
    },
    margin: "10px",
  },
  linuxButton: {
    color: "#000",
    backgroundColor: "#35d438",
    "&:hover": {
      color: "#35d438",
      backgroundColor: "#000",
    },
    margin: "10px",
  },
}));

const DownloadButton: React.FC = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Link
        href="https://github.com/DataPiratesSIH/gearstalk-electron-app/releases/download/v0.2.0/gearstalk-0.2.0.exe"
        underline="none"
      >
        <Button
          variant="contained"
          className={classes.windowsButton}
          startIcon={<FaWindows />}
        >
          DOWNLOAD FOR WINDOWS
        </Button>
      </Link>{" "}
      <Link
        href="https://github.com/DataPiratesSIH/gearstalk-electron-app/releases/download/v0.2.0/gearstalk-0.2.0.pkg"
        underline="none"
      >
        <Button
          variant="contained"
          className={classes.iosButton}
          startIcon={<FaApple />}
        >
          DOWNLOAD FOR IOS
        </Button>
      </Link>{" "}
      <Link
        href="https://github.com/DataPiratesSIH/gearstalk-electron-app/releases/download/v0.2.0/gearstalk-0.2.0.AppImage"
        underline="none"
      >
        <Button
          variant="contained"
          className={classes.linuxButton}
          startIcon={<FaLinux />}
        >
          DOWNLOAD FOR LINUX
        </Button>
      </Link>
    </React.Fragment>
  );
};

export default DownloadButton;
