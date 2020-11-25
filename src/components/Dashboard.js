import React, { useState } from "react";
import Header from "../components/Header";
import Map from "../components/Map";

function Dashboard() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const changeLocation = (lat, lng) => {
    setLatitude({ data: lat });
    setLongitude({ data: lng });
  };

  return (
    <div className="dashboard">
      <Header changeLocation={changeLocation}></Header>
      <Map latitude={latitude} longitude={longitude}></Map>
    </div>
  );
}

export default Dashboard;
