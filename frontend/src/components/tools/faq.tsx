
import Faq from "react-faq-component";
import React, { useState, useEffect,Component } from "react";

 
const data = {
    title:"Frequently Asked Questions",
    rows: [
        {
            title: "How many components can be identfied?",
            content: "Based on the video uploaded,components like shirts,pants,caps,sarees,blazers,burkhas,shorts,etc can be identified accurately ",
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
    ],
};
 
const styles = {
    bgColor:"#2a3f73",
    titleTextColor: "#ffffff",
    rowTitleColor: "#30a3f2",
    textAlign: "center",
    rowContentColor: 'white',
    arrowColor: "#05e5fa",
    fontSize: "50px",
};
 
const config = {
    animate: true,
};
 
export default class App extends Component {
    render() {
        return (
            <div>
                <Faq data={data} styles={styles} config={config} />
            </div>
        );
    }
}