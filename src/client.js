import 'whatwg-fetch';
import Map from './components/Map';
import PopupContent from './components/PopupContent';
import Promise from 'bluebird';
import React from 'react';
import { render } from 'react-dom';

const renderMap = ( counties, markers ) => render(
  <Map
    counties={ counties }
    initialLat={ 0 }
    initialLng={ 38 }
    initialZoom={ 7 }
    markers={ markers }
    tileUrl="https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY29saW5tZWlua2UiLCJhIjoiY2l0bGo5MTM5MDAxODJvcDg3bmdnN2plYiJ9.4TtGWJpcv6h99gwDqtNNMA
"
  />,
  document.querySelector( '.app' )
);

const createMap = ([ counties, items ]) => {
  const markers = items
    .map(({ county, description, location, objectives, title }) => ({
      content: (
        <PopupContent
          description={ description }
          objectives={ objectives }
          title={ title }
        />
      ),
      county,
      lat: location[ 0 ],
      lng: location[ 1 ],
    }));

  renderMap( counties, markers );
};

Promise.all([
  fetch( `//${ window.location.host }/counties.geojson` ),
  fetch( `//${ window.location.host }/items.json` ),
])
  .then( responses => Promise.all( responses.map( res => res.json())))
  .then( createMap )
  .catch( err => console.error( err ));
