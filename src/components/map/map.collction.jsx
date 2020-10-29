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
      mapboxApiAccessToken={`${process.env.REACT_APP_MAP_API_KEY}`}
    />
  );
};

export default Map;
