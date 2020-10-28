import React, { useState } from "react";
import ReactMapGL from "react-map-gl";

import "./map.styles.scss";

const center = {
  lat: 13.923765,
  lng: 75.592539,
};

const Map = ({ width, height }) => {
  const [viewport, setViewport] = useState({
    width: width,
    height: height,
    latitude: center.lat,
    longitude: center.lng,
    zoom: 18,
  });

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapboxApiAccessToken="pk.eyJ1IjoiYXJtZWRldiIsImEiOiJja2d0bnI2dWYwZ2MwMnduYTMxcmJyZDN1In0.61LIA3rLA07uFIIIefCH1A"
    />
  );
};

export default Map;
