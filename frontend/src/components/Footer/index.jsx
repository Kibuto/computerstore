import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const Footer = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCJqpC7oo-YYJJ1pRVZJgf84qExlHZCWSc",
  });

  return isLoaded ? (
    <div>
      <p class="text-center font-weight-bold">Chỗ mua hàng nè! </p>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: 10.856925, lng: 106.605938 }}
        zoom={16}
      >
        <Marker position={{ lat: 10.856925, lng: 106.605938 }} />
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};
export default Footer;
