import React, { useState } from "react";

import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
} from "@chakra-ui/react";
import { MapContainer, TileLayer } from "react-leaflet";

import DraggableMarker from "../DraggableMarker";

function LocationMapPicker({ dispatch, location }) {
  const [position, setPosition] = useState(location);

  const setLocation = () => {
    dispatch({ type: "SET_LOCATION", payload: position });
  };

  return (
    <FormControl padding="5px 0">
      <FormLabel>Pick your location</FormLabel>
      <Grid
        border="1px"
        borderColor="gray.200"
        rounded="lg"
        p={3}
        placeItems="center"
        _hover={{
          borderColor: "gray.300",
        }}
        transition="0.2s"
      >
        <FormHelperText mb={3}>
          Press the map to find your location, drag the pin to choose your
          location.
        </FormHelperText>
        <MapContainer center={location} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <DraggableMarker position={position} setPosition={setPosition} />
        </MapContainer>
        <Button
          mt={3}
          textColor="black"
          colorScheme="boostyellow"
          onClick={setLocation}
        >
          Set Location
        </Button>
      </Grid>
    </FormControl>
  );
}
export default LocationMapPicker;
