"use client";
import { IProperty } from "@/types";
import Map, { Marker } from "react-map-gl/mapbox";
import { useEffect, useState } from "react";
import {
  setDefaults,
  fromAddress,
  GeocodeOptions,
  OutputFormat,
} from "react-geocode";
import Image from "next/image";
import Spinner from "./Spinner";
import pin from "@/assets/images/pin.svg";

import "mapbox-gl/dist/mapbox-gl.css";

interface PropertyMapProps {
  property: IProperty;
}

interface ICoordinates {
  lat: number;
  lng: number;
}

export default function PropertyMap({ property }: PropertyMapProps) {
  const [coords, setCoords] = useState<ICoordinates>({ lat: 0, lng: 0 });
  // const [viewport, setViewport] = useState({
  //   latitude: 0,
  //   longitude: 0,
  //   zoom: 12,
  //   width: "100%",
  //   height: "500px",
  // });
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  const geocodeOptions: GeocodeOptions = {
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: "en",
    region: "us",
    outputFormat: OutputFormat.JSON,
  };

  const {
    location: { street, city, state, zipcode },
  } = property;

  setDefaults(geocodeOptions);

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(`${street} ${city} ${state} ${zipcode}`);

        if (res.results.length === 0) {
          setGeocodeError(true);
          setLoading(false);
          return;
        }

        const { lat, lng } = res.results[0].geometry.location;
        setCoords({ lat, lng });
        // setViewport((prev) => ({
        //   ...prev,
        //   latitude: lat,
        //   longitude: lng,
        // }));

        setLoading(false);
      } catch (error) {
        console.log(error);
        setGeocodeError(true);
        setLoading(false);
      }
    };

    fetchCoords();
  }, []);

  if (loading) return <Spinner />;

  if (geocodeError) {
    return <div className="text-xl">No location data found</div>;
  }

  const { lat, lng } = coords;

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      mapLib={import("mapbox-gl")}
      initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom: 15,
      }}
      style={{ width: "100%", height: 500 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker longitude={lng} latitude={lat} anchor="bottom">
        <Image src={pin} alt="location" width={40} height={40} />
      </Marker>
    </Map>
  );
}
