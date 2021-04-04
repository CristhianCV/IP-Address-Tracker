import React, { useState } from "react";
import "./Header.css";
import iconArrow from "../assets/img/icon-arrow.svg";
import axios from "axios";

function Header({ changeLocation }) {
  const [address, setAddress] = useState("");
  const [addressInfo, setAddressInfo] = useState(null);
  const [isDetailHidden, setIsDetailHidden] = useState(false);

  const onClickSearchHandle = () => {
    if (address.trim() !== "") {
      axios
        .get(
          `https://geo.ipify.org/api/v1?apiKey=at_Qihz0duRRHIITcWSmJ3nqLSh8Np7t&ipAddress=${address}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (response) {
          setAddressInfo(response.data);
          changeLocation(
            response.data.location.lat,
            response.data.location.lng
          );
        })
        .catch(function (error) {
          setAddressInfo(null);
          console.log(error);
          alert("Hubo un error al buscar la informacion.");
        });
    }
  };

  const onAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const onClickShowHandle = () => {
    setIsDetailHidden(!isDetailHidden);
  };

  return (
    <div className="header">
      <div className="header__content">
        <span>IP Address Tracker</span>
        <div className="header__search">
          <div className="header__searchInput">
            <input
              type="text"
              name="filter"
              placeholder="Search for any IP address or domain"
              onChange={onAddressChange}
            ></input>
          </div>
          <div className="header__searchButton" onClick={onClickSearchHandle}>
            <img src={iconArrow} alt="icon_arrow"></img>
          </div>
        </div>
        <div className="header__details desktop__details">
          <div className="header__address">
            <h5>IP ADDRESS</h5>
            <p>{addressInfo ? addressInfo.ip : "-"}</p>
          </div>
          <div className="header__location">
            <h5>LOCATION</h5>
            <p>
              {addressInfo
                ? `${addressInfo.location.city}, ${addressInfo.location.region} ${addressInfo.location.postalCode}`
                : "-"}
            </p>
          </div>
          <div className="header__timezone">
            <h5>TIMEZONE</h5>
            <p>{addressInfo ? `UTC ${addressInfo.location.timezone}` : "-"}</p>
          </div>
          <div className="header__isp">
            <h5>ISP</h5>
            <p>{addressInfo ? addressInfo.isp : "-"}</p>
          </div>
        </div>
        {isDetailHidden ? (
          <div className="header__details mobile__details">
            <div className="header__location">
              <h5>LOCATION</h5>
              <p>
                {addressInfo
                  ? `${addressInfo.location.city}, ${addressInfo.location.region} ${addressInfo.location.postalCode}`
                  : "-"}
              </p>
            </div>
          </div>
        ) : (
          <div className="header__details mobile__details">
            <div className="header__address">
              <h5>IP ADDRESS</h5>
              <p>{addressInfo ? addressInfo.ip : "-"}</p>
            </div>
            <div className="header__location">
              <h5>LOCATION</h5>
              <p>
                {addressInfo
                  ? `${addressInfo.location.city}, ${addressInfo.location.region} ${addressInfo.location.postalCode}`
                  : "-"}
              </p>
            </div>
            <div className="header__timezone">
              <h5>TIMEZONE</h5>
              <p>
                {addressInfo ? `UTC ${addressInfo.location.timezone}` : "-"}
              </p>
            </div>
            <div className="header__isp">
              <h5>ISP</h5>
              <p>{addressInfo ? addressInfo.isp : "-"}</p>
            </div>
          </div>
        )}

        <button onClick={onClickShowHandle} type="button" id="btnExpandDetails">
          {isDetailHidden ? "🔻 SHOW" : "🔺 HIDE"}
        </button>
      </div>
      <div className="header__background"></div>
    </div>
  );
}

export default Header;
