import React from "react";
import { FaGithub, FaCopyright } from 'react-icons/fa'


export default function footer() {
  return (
    <div style={{ background: "#1f1f1f", height: "210px" }}>
        <div style={{ color:"white", padding: "40px", textAlign:"center"}}>
            <FaGithub  size="40px" href="#"/>
            <br /><br />
            View the code Here.
            <br /><br />
            <FaCopyright />
            &nbsp;&nbsp;
            2020 DATA PIRATES.  ALL RIGHTS RESERVED. PRIVACY POLICY
        </div>
    </div>
  );
}
