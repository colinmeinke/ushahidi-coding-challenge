import 'whatwg-fetch';
import Map from './components/Map';
import PopupContent from './components/PopupContent';
import React from 'react';
import { render } from 'react-dom';

const renderMap = markers => render(
  <Map
    initialLat={ 0 }
    initialLng={ 38 }
    initialZoom={ 7 }
    markers={ markers }
    tileUrl="https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY29saW5tZWlua2UiLCJhIjoiY2l0bGo5MTM5MDAxODJvcDg3bmdnN2plYiJ9.4TtGWJpcv6h99gwDqtNNMA
"
  />,
  document.querySelector( '.app' )
);

const createMap = items => {
  const markers = items
    .map(({ description, location, objectives, title }) => ({
      content: (
        <PopupContent
          description={ description }
          objectives={ objectives }
          title={ title }
        />
      ),
      lat: location[ 0 ],
      lng: location[ 1 ],
    }));

  renderMap( markers );
};

fetch( `//${ window.location.host }/items.json` )
  .then(( response ) => response.json())
  .then( createMap )
  .catch( err => console.error( err ));
