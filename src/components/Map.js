import React, { useEffect, useState } from "react";
import "./Map.css";
import * as L from "../../node_modules/leaflet/dist/leaflet";
import iconLocation from "../assets/img/icon-location.svg";

function Map({ latitude, longitude }) {
  const [mymap, setmapa] = useState(null);
  const [customIcon, seticono] = useState(null);

  if (mymap && latitude && longitude) {
    mymap.setView([latitude.data, longitude.data], 13);
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoiY3Jpc3RoaWFuOTkiLCJhIjoiY2tobWJlM2NtMDlkYjJ3bGkzOXd1NTEwYiJ9.XxT4iRo81RnxpcTs2bvxUQ",
      }
    ).addTo(mymap);

    L.marker([latitude.data, longitude.data], { icon: customIcon }).addTo(
      mymap
    );
  }

  useEffect(() => {
    const mymap_aux = L.map("mapid", { zoomControl: false });
    const customIcon_aux = L.icon({
      iconUrl: iconLocation,
      iconSize: [28, 36], // size of the icon
      iconAnchor: [14, 36], // point of the icon which will correspond to marker's location
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });

    setmapa(mymap_aux);
    seticono(customIcon_aux);
  }, []);

  return (
    <div className="map__container">
      <div id="mapid"></div>
    </div>
  );
}

export default Map;
