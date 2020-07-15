import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CardSearch from "../utils/CardSearch";

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 370,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

interface TabPanelProps {
  value: number;
  index: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};
interface Props {
  results: any[];
}

const TimeStamp: React.FC<Props> = ({ results }) => {
  const classes = useStyles();
  const [value, setValue] = useState<number>(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {results.map((r, i) => (
          <Tab key={i} label={`Person ${i + 1}`} {...a11yProps(i)} />
        ))}
      </Tabs>
      {results.map((r, i) => (
        <TabPanel key={i} value={value} index={i}>
          {/* Person {i} */}
          <CardSearch />
        </TabPanel>
      ))}
    </div>
  );
};

export default TimeStamp;
