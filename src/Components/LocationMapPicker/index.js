import React, { useState } from 'react';

import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
} from '@chakra-ui/react';
import { MapContainer, TileLayer } from 'react-leaflet';

import DraggableMarker from '../DraggableMarker';

function LocationMapPicker({ dispatch }) {
  const center = {
    lat: 52.4754,
    lng: -1.8845,
  };
  const [position, setPosition] = useState(center);

  const setLocation = () => {
    dispatch({ type: 'SET_LOCATION', payload: position });
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
      >
        <FormHelperText mb={3}>
          Press the map to find your location, drag the pin to choose your
          location.
        </FormHelperText>
        <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <DraggableMarker position={position} setPosition={setPosition} />
        </MapContainer>
        <Button mt={3} bg="#facd60" onClick={setLocation}>
          Set Location
        </Button>
      </Grid>
    </FormControl>
  );
}
export default LocationMapPicker;
