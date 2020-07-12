import React from "react";
import {
  Container,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  makeStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const data = [
  {
    title: "How many components can be identfied?",
    content:
      "Based on the video uploaded,components like shirts, pants, caps, sarees, blazers, burkhas, shorts, etc can be identified accurately ",
  },
  {
    title: "What are the specifications for the size of the video?",
    content:
      "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.",
  },
  {
    title: "How do I upload the video?",
    content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem. 
            Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam. 
            Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat. 
            Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
  },
  {
    title: "What are the technologies used in the making of this project?",
    content: "v1.0.0",
  },
  {
    title: "How do I find out a particular location for camera feed? ",
    content: "v1.0.0",
  },
  {
    title: "How do I access a particular camera from a location?",
    content: "v1.0.0",
  },
];

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(17),
    fontWeight: theme.typography.fontWeightRegular,
  },
  content: {
    fontSize: theme.typography.pxToRem(17),
    fontWeight: theme.typography.fontWeightRegular,
    color: "#fff",
  },
}));

const FAQs: React.FC = () => {
  const classes = useStyles();
  return (
    <Container style={{ maxWidth: "100vw" }}>
      <div
        style={{
          textAlign: "center",
          fontSize: "32px",
          fontWeight: 500,
          padding: "30px 0px",
        }}
      >
        Frequently Asked Questions
      </div>
      <div style={{ width: "100%" }}>
        {data.map((d, i) => (
          <ExpansionPanel style={{ width: "100%" }} key={i}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
            >
              <Typography className={classes.heading}>{d.title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className={classes.content}>{d.content}</div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    </Container>
  );
};

export default FAQs;
