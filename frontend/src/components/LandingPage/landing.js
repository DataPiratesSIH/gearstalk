import React from "react";
import { Button } from "@material-ui/core"
import { GiMiner, GiMiningHelmet } from "react-icons/gi"
import "./landing.css";
import Header from "./header";
import { PieChart,WorldMap } from "./charts.js"
import TechStack from "./techstack"
import Footer from "./footer"



export default function App() {
  return (
    <div className="App">
      <Header />
      <div className="section-content rowC section1" paddingbottom="0px">
        <div style={{ paddingleft:"0px", width: "50%", textAlign: "left", color: "white" }}>
          <br/>
          <button style={{ background: "linear-gradient(90deg, rgba(29, 36, 63, 1) 5%, rgba(35, 46, 79, 1) 96%)", borderRadius: "50px", padding: "15px", color: "white", fontSize: "15px" }}>
            Smart India Hackathon Project
          </button>
          <br/>
          <h1 style={{ fontSize: "50px" }}>Textiles Detection</h1>
          <h3 sm={12} lg={4} >To configure this component to work with your existing app, you’ll need to import and call initImages, passing an object for configuration. imageResolver is where you will take the processed image object with calculated dimensions and generate a URL that conforms to how your CMS resizes images.</h3>
          <br/>
          <Button variant="contained" color="primary">
            Go to Console
          </Button>
          &nbsp;&nbsp;&nbsp; 
          <Button variant="outlined" color="primary">
            Github
          </Button>
        </div>
        <div className="inner-content" style={{ paddingLeft : "0px", width: "50%" }}>
          <img src={require('./images/start.png')} height="400px" width="600px" alt="Start_image" />
        </div>
      </div>

      <div className="section-content section2" style={{ background: "#111"}}>
        <div className="inner-content">
          <h1 className="Headers">Features Implemented</h1>
          <div className="rowC">
            <div className="box" >
              <GiMiner size="90px" color="blue" />
              <h2>feature1</h2>
              <h5>The leading digital currency by market capitalization, has grown in value by more than 10 times.</h5>
            </div>
            <div className="box" >
              <GiMiningHelmet size="90px" color="blue"/>
              <h2>feature2</h2>
              <h5>The leading digital currency by market capitalization, has grown in value by more than 10 times.</h5>
            </div>
            <div className="box" >
              <GiMiner size="90px" color="blue" />
              <h2>feature3</h2>
              <h5>The leading digital currency by market capitalization, has grown in value by more than 10 times.</h5>
            </div>
            <div className="box" >
              <GiMiningHelmet size="90px" color="blue"/>
              <h2>feature4</h2>
              <h5>The leading digital currency by market capitalization, has grown in value by more than 10 times.</h5>
            </div>
            <div className="box" >
              <GiMiner size="90px" color="blue" />
              <h2>feature5</h2>
              <h5>The leading digital currency by market capitalization, has grown in value by more than 10 times.</h5>
            </div>
          </div>
          <div className="rowC">
            <div className="box" >
              <GiMiner size="90px" color="blue" />
              <h2>feature1</h2>
              <h5>The leading digital currency by market capitalization, has grown in value by more than 10 times.</h5>
            </div>
            <div className="box" >
              <GiMiningHelmet size="90px" color="blue"/>
              <h2>feature2</h2>
              <h5>The leading digital currency by market capitalization, has grown in value by more than 10 times.</h5>
            </div>
            <div className="box" >
              <GiMiner size="90px" color="blue" />
              <h2>feature3</h2>
              <h5>The leading digital currency by market capitalization, has grown in value by more than 10 times.</h5>
            </div>
            <div className="box" >
              <GiMiningHelmet size="90px" color="blue"/>
              <h2>feature4</h2>
              <h5>The leading digital currency by market capitalization, has grown in value by more than 10 times.</h5>
            </div>
            <div className="box" >
              <GiMiner size="90px" color="blue" />
              <h2>feature5</h2>
              <h5>The leading digital currency by market capitalization, has grown in value by more than 10 times.</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="section-content section3">
        <h1 className="Headers">About the Model</h1>
        <br/>
        <div className="rowC">
        <div className="inner-content" style={{ paddingLeft : "60px", width: "50%", textAlign: "left" }}>
          <h1 style={{ color: "lightgreen" }}>MultiLabel Image classifier</h1>
          <h4>(Resnet Architechture)</h4>
          <h3 sm={12} lg={4}>To configure this component to work with your existing app, you’ll need to import and call initImages, passing an object for configuration. imageResolver is where you will take the processed image object with calculated dimensions and generate a URL that conforms to how your CMS resizes images.<br></br>The example below connects to a local instance of image-steam and will resize image based on the users viewport and pixel density.</h3>
        </div>
        <PieChart />
        </div>
      </div>

      <div className="section-content section4" style={{ background: "#111" }}>
      <h1 className="Headers">Prepration of the Database</h1>
      <div className="rowC">
        <WorldMap />
        <div className="inner-content" style={{ paddingLeft : "60px", width: "50%", textAlign: "left", color: "#2563ff" }}>
          <h1>CCTV Cameras at<br></br>various Locations.</h1>
          <h3 style={{ color: "white" }} sm={12} lg={4}>To configure this component to work with your existing app, you’ll need to import and call initImages, passing an object for configuration. imageResolver is where you will take the processed image object with calculated dimensions and generate a URL that conforms to how your CMS resizes images.<br></br>The example below connects to a local instance of image-steam and will resize image based on the users viewport and pixel density.</h3>
        </div>
        </div>
      </div>

      <div className="section-content section5" style={{ padding: "0px", background: "#111" }}>
        <div className="inner-content">
        <h1 className="Headers">Technologies Used</h1>
          <TechStack />
        </div>
      </div>
      <Footer />
    </div>
  );
}
