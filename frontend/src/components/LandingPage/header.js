import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import { Button } from "@material-ui/core";
import "./header.css";
import { Link } from "react-scroll";
import { FaBeer } from "react-icons/fa"

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },

}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100
  });

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

// $(document).ready(function() {
//   $(window).scroll(function() {
//     var height = $(".first-container").height();
//     var scrollTop = $(window).scrollTop();

//     if (scrollTop >= height - 40) {
//       $(".nav-container").addClass("solid-nav");
//     } else {
//       $(".nav-container").removeClass("solid-nav");
//     }
//   });
// });

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func
};

export default function BackToTop(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar color="primary" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Toolbar>
        <img
            src={<FaBeer />}
            className="nav-logo"
            alt="Logo"
          />
        <Button variant="h6">
          <Link
          activeClass="active"
          to="section1"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          Home
        </Link>
        </Button>
        <Button variant="h6">
          <Link
            activeClass="active"
            to="section2"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            features
          </Link>
        </Button>
        <Button variant="h6">
        <Link
          activeClass="active"
          to="section3"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          Model
        </Link>
        </Button>
        <Button variant="h6">
        <Link
          activeClass="active"
          to="section4"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          Database
        </Link>
        </Button>
        <Button variant="h6">
        <Link
          activeClass="active"
          to="section5"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          Tech-Stack
        </Link>
        </Button>
          <Button variant="contained" color="default" href="#">
            Go to Console
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop {...props}>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
