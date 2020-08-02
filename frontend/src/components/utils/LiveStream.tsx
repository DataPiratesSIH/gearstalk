import React from "react";
import { Container } from "@material-ui/core";


const LiveStream: React.FC = () => {
  return (
      <Container maxWidth="xl">
      <h3>Live Streaming</h3>
      <img src="http://192.168.0.102:8080/video" width="80%" alt="livestream footage"></img>
      </Container>
  );
};

export default LiveStream;
