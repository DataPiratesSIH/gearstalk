import React, { useContext } from "react";
import FadeIn from "../utils/FadeIn";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { Button, Grid } from "@material-ui/core";
import Header from "./Header";
import { PieChart, WorldMap } from "./Charts";
import TechStack from "./Techstack";
import Footer from "./Footer";
import Mockup from "./Mockup";
import "./Landing.css";
import DownloadButton from "./DownloadButton";

interface FeatureProps {
  children: React.ReactNode;
}

const Feature: React.FC<FeatureProps> = ({ children }) => {
  return (
    <Grid className="box" item lg={3} md={4} sm={6} xs={12}>
      <FadeIn>{children}</FadeIn>
    </Grid>
  );
};

const Landing: React.FC = () => {
  let history = useHistory();
  const auth = useContext(AuthContext);

  return (
    <div className="landing">
      <Header isLoggedIn={auth.isLoggedIn} />
      <div className="section-content rowC section1">
        <Grid container>
          <Grid
            style={{ paddingLeft: "0px", textAlign: "left", color: "white" }}
            item
            md={6}
            xs={12}
          >
            <br />
            <FadeIn>
              <button
                style={{
                  background:
                    "linear-gradient(90deg, rgba(29, 36, 63, 1) 5%, rgba(35, 46, 79, 1) 96%)",
                  borderRadius: "50px",
                  padding: "15px",
                  color: "white",
                  fontSize: "15px",
                }}
              >
                Smart India Hackathon Project
              </button>
              <br />
              <h1 style={{ padding: "10px", fontSize: "50px" }}>
                Textile Detection
              </h1>
              <h3 style={{ padding: "10px" }}>
                To configure this component to work with your existing app,
                you’ll need to import and call initImages, passing an object for
                configuration. imageResolver is where you will take the
                processed image object with calculated dimensions and generate a
                URL that conforms to how your CMS resizes images.
              </h3>
              <br />
              {auth.isLoggedIn ? (
                <Button
                  variant="contained"
                  style={{
                    color: "#060124",
                    backgroundColor: "#2db1e1",
                    fontWeight: 500,
                  }}
                  onClick={() => history.push("/console")}
                >
                  Go to Console
                </Button>
              ) : (
                <>
                  <Button
                    variant="contained"
                    style={{
                      color: "#060124",
                      backgroundColor: "#2db1e1",
                      fontWeight: 500,
                    }}
                    onClick={() => history.push("/signup")}
                  >
                    Sign Up
                  </Button>
                  &nbsp;
                  <Button
                    variant="contained"
                    style={{
                      color: "#060124",
                      backgroundColor: "#2db1e1",
                      fontWeight: 500,
                    }}
                    onClick={() => history.push("/signin")}
                  >
                    Log In
                  </Button>
                </>
              )}
              &nbsp;&nbsp;&nbsp;
              <Button variant="outlined" color="primary">
                Github
              </Button>
              <div style={{ marginTop: "20px" }}>
<DownloadButton />
              </div>
            </FadeIn>
          </Grid>
          <Grid
            className="inner-content"
            style={{ paddingLeft: "0px" }}
            item
            md={6}
            xs={12}
          >
            <FadeIn>
              {/* <img
                src={require("./images/start.png")}
                className="start-img"
                alt="Start_image"
              /> */}
              <Mockup />
            </FadeIn>
          </Grid>
        </Grid>
      </div>

      <div className="section-content section2" style={{ background: "#111" }}>
        <div className="inner-content">
          <h1 className="Headers">Features Implemented</h1>
          <Grid container>
            <Feature>
              {/* <GiMiner size="90px" color="blue" /> */}
              <img
                src={require("./images/videolibrary.png")}
                alt="Test"
                style={{ width: 150 }}
              />
              <h2>VIDEO LIBRARY</h2>
              <h5>
                It is a library where all the cctv video is stored.We can search
                and filter the videos on different aspects stored in the
                database.
              </h5>
            </Feature>
            <Feature>
              {/* <GiMiningHelmet size="90px" color="blue" /> */}
              <img
                src={require("./images/addvideo.png")}
                alt="Test"
                style={{ width: 150 }}
              />
              <h2>ADD VIDEO</h2>
              <h5>Adds video to the current database.</h5>
            </Feature>
            <Feature>
              <img
                src={require("./images/scable.jpg")}
                alt="Test"
                style={{ width: 180, height: 150 }}
              />
              <h2>SCALABLE ARCHITECTURE</h2>
              <h5>
                The program can handle more than just one functionality, such as
                we can detect more than one person in the video timeframe and
                can list the mulitple cloths they are wearing on by selection a
                perticular persons in that timeframe.
              </h5>
            </Feature>
            <Feature>
              {/* <GiMiningHelmet size="90px" color="blue" /> */}
              <img
                src={require("./images/search1.jpg")}
                alt="Test"
                style={{ width: 150 }}
              />
              <h2>SEARCH</h2>
              <h5>
                A video is chooses from the database to be processed, the video
                gets processed frame by frame in which it identifies the total
                number of people in each frame and identifies all the clothes
                worn by them and listes them, it also captues the a particular
                frame we want from the video.
              </h5>
            </Feature>
            <Feature>
              <img
                src={require("./images/speech.jpg")}
                alt="Test"
                style={{ width: 180, height: 150 }}
              />
              <h2>SPEECH RECOGNITION</h2>
              <h5>
                This feature help us to operate faster ,insted of just clicking
                and selecting each and every person that we see on the
                videoframe, we can just tell the program to select the
                particular person which list what he is attire wearing.
              </h5>
            </Feature>
            <Feature>
              {/* <GiMiner size="90px" color="blue" /> */}
              <img
                src={require("./images/visualization.png")}
                alt="Test"
                style={{ width: 150 }}
              />
              <h2>ANALYTICS</h2>
              <h5>
                It helps to visualise the different aspects of the video by
                ploting the different parameters recognized in the following
                video on the graph to get a better understanding.
              </h5>
            </Feature>
          </Grid>
        </div>
      </div>

      <div className="section-content section3">
        <h1 className="Headers">About the Model</h1>
        <br />
        <Grid container>
          <Grid
            item
            md={6}
            sm={12}
            xs={12}
            style={{ paddingLeft: "20px", textAlign: "left" }}
          >
            <FadeIn>
              <h1 style={{ color: "lightgreen" }}>
                MultiLabel Image classifier
              </h1>
              <h4>(Resnet Architechture)</h4>
              <h3>
                To configure this component to work with your existing app,
                you’ll need to import and call initImages, passing an object for
                configuration. imageResolver is where you will take the
                processed image object with calculated dimensions and generate a
                URL that conforms to how your CMS resizes images.<br></br>The
                example below connects to a local instance of image-steam and
                will resize image based on the users viewport and pixel density.
              </h3>
            </FadeIn>
          </Grid>
          <Grid item md={6} sm={12} style={{ paddingLeft: "10px" }}>
            <FadeIn>
              <PieChart />
            </FadeIn>
          </Grid>
        </Grid>
      </div>

      <div className="section-content section4" style={{ background: "#111" }}>
        <h1 className="Headers">Preparation of the Database</h1>
        <Grid container>
          <Grid item md={6} sm={12}>
            <FadeIn>
              <WorldMap />
            </FadeIn>
          </Grid>
          <Grid
            style={{ textAlign: "left", color: "#2563ff" }}
            item
            md={6}
            sm={12}
          >
            <FadeIn>
              <h1 style={{ padding: "0px 15px" }}>
                CCTV Cameras at<br></br>various Locations.
              </h1>
              <h3 style={{ padding: "0px 15px", color: "white" }}>
                To configure this component to work with your existing app,
                you’ll need to import and call initImages, passing an object for
                configuration. imageResolver is where you will take the
                processed image object with calculated dimensions and generate a
                URL that conforms to how your CMS resizes images.<br></br>The
                example below connects to a local instance of image-steam and
                will resize image based on the users viewport and pixel density.
              </h3>
            </FadeIn>
          </Grid>
        </Grid>
      </div>

      <div
        className="section-content section5"
        style={{ padding: "0px", background: "#111" }}
      >
        <div className="inner-content">
          <h1 className="Headers">Technologies Used</h1>
          <TechStack />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
