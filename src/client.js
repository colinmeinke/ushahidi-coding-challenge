import 'whatwg-fetch';
import Map from './components/Map';
import { Marker, Popup } from 'react-leaflet';
import PopupContent from './components/PopupContent';
import React from 'react';
import { render } from 'react-dom';

const createMap = items => render(
  <Map
    initialLat={ -4.34104483883 }
    initialLng={ 39.55379750320 }
    initialZoom={ 9 }
    items={ items }
    tileUrl="https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY29saW5tZWlua2UiLCJhIjoiY2l0bGo5MTM5MDAxODJvcDg3bmdnN2plYiJ9.4TtGWJpcv6h99gwDqtNNMA
"
  >
    { items.map(({ description, location, objectives, title }, i ) => (
      <Marker
        key={ i }
        position={[ location[ 0 ], location[ 1 ]]}
      >
        <Popup>
          <PopupContent
            description={ description }
            objectives={ objectives }
            title={ title }
          />
        </Popup>
      </Marker>
    ))}
  </Map>,
  document.querySelector( '.app' )
);

fetch( 'http://localhost:3000/data.json' )
  .then(( response ) => response.json())
  .then( createMap )
  .catch( err => console.error( err ));
