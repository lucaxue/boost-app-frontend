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
import { SET_LOCATION } from 'Reducers/eventToPost/eventToPost.actions';

function LocationMapPicker({ dispatch, location }) {
  const [position, setPosition] = useState({ lat: 52.4754, lng: -1.8845 });

  const setLocation = () => {
    dispatch({ type: SET_LOCATION, payload: position });
  };

  const locationIsSet =
    location.lat === position.lat && location.lng === position.lng;

  return (
    <FormControl padding="5px 0">
      <FormLabel>Pick your location</FormLabel>
      <Grid
        border="1px"
        borderColor="gray.200"
        rounded="lg"
        p={3}
        placeItems="center"
        transition="0.2s"
        _hover={{
          borderColor: 'gray.300',
        }}
        _focusWithin={{
          zIndex: '1',
          borderColor: 'blue.400',
        }}
      >
        <FormHelperText mb={3}>
          Press the map to find your location, drag the pin to choose your
          location.
        </FormHelperText>
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <DraggableMarker position={position} setPosition={setPosition} />
        </MapContainer>
        <Button
          w="140px"
          mt={3}
          textColor={locationIsSet ? 'white' : 'black'}
          colorScheme={locationIsSet ? 'boostblue' : 'boostyellow'}
          onClick={setLocation}
        >
          {locationIsSet ? (
            <span className="material-icons-outlined">done</span>
          ) : (
            'Set Location'
          )}
        </Button>
      </Grid>
    </FormControl>
  );
}
export default LocationMapPicker;
