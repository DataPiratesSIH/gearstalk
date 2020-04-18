import React, { useState, useEffect } from "react";
import InteractiveMap from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { MapboxLayer } from "@deck.gl/mapbox";
import { GeoJsonLayer } from "@deck.gl/layers";

const BUILDINGS_JSON =
  "https://development-activity-model.s3-ap-southeast-2.amazonaws.com/Footprints_Developments.json";
const MAPBOX_TOKEN =
  "pk.eyJ1IjoiZ2lzZmVlZGJhY2siLCJhIjoiY2pzeTNrcmxqMDhpbjQ0cGZ6d3pteng1cCJ9.BWEwpntKJgZWwu5qw3hpsA";
const MAPBOX_STYLE = "mapbox://styles/gisfeedback/cjvod9hc909kh1eo9nj23g33k";

const MapGL = () => {
  /**
   * Store mapbox style in state so we can
   * update it as described in react-map-gl
   * (without Immutable.js);
   */
  const [style, setStyle] = useState(MAPBOX_STYLE);
  const onLoad = () => {
    fetch(
      `https://api.mapbox.com/styles/v1/${MAPBOX_STYLE.replace(
        "mapbox://styles/",
        ""
      )}?access_token=${MAPBOX_TOKEN}`
    )
      .then(res => res.json())
      .then(res => {
        /**
         * Add the entire style to state, plus add the geojson
         * source for use later on (inline source doesn't work)
         * with react-map-gl, requires a string.
         */
        setStyle({
          ...res,
          sources: {
            ...res.sources,
            buildings: {
              type: "geojson",
              data: BUILDINGS_JSON
            }
          }
        });
      });
  };

  /**
   * When the style has loaded and the buildings
   * layers don't exist yet, add them into the
   * style.
   */
  useEffect(() => {
    if (
      typeof style !== "string" &&
      style.layers.findIndex(d => d.id === "buildings-mapbox") === -1 &&
      style.layers.findIndex(d => d.id === "buildings") === -1
    ) {
      /**
       * Obviously this works as a mapbox layer,
       * uncomment this and comment out the next
       * setStyle.
       */
      setStyle(prevStyle => ({
        ...prevStyle,
        layers: [
          ...prevStyle.layers,
          {
            id: "buildings-mapbox",
            type: "fill",
            source: "buildings",
            paint: {
              "fill-color": "#0ff"
            }
          }
        ]
      }));
      /**
       * @PROBLEM
       * I would like to use this signature for state
       * management reasons. Is it possible within
       * react, or do I *have* to use the { id: "myLayer",
       * deck: deckRef.current.deck } signature?
       */
    //   setStyle(prevStyle => ({
    //     ...prevStyle,
    //     layers: [
    //       ...prevStyle.layers,
    //       new MapboxLayer({
    //         id: "buildings",
    //         type: GeoJsonLayer,
    //         data: BUILDINGS_JSON,
    //         getFillColor: [255, 0, 255]
    //       })
    //     ]
    //   }));
    }
  }, [style]);

  /**
   * Manage State
   */
  const [viewState, setViewState] = useState({
    longitude: 144.965,
    latitude: -37.818,
    zoom: 13
  });

  const deckLayers = React.useMemo(() => {
    return;
  }, [style.layers]);

  return (
    <DeckGL
      controller
      viewState={viewState}
      onViewStateChange={({ viewState }) => setViewState(viewState)}
      layers={deckLayers}
    >
      <InteractiveMap
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onLoad={onLoad}
        mapStyle={style}
      />
    </DeckGL>
  );
}

export default MapGL;