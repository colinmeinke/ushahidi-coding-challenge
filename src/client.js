import Map from './components/Map';
import React from 'react';
import { render } from 'react-dom';



render(
  <Map
    initialLat={ -4.34104483883 }
    initialLng={ 39.55379750320 }
    initialZoom={ 9 }
    tileUrl="https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY29saW5tZWlua2UiLCJhIjoiY2l0bGo5MTM5MDAxODJvcDg3bmdnN2plYiJ9.4TtGWJpcv6h99gwDqtNNMA
"
  />,
  document.querySelector( '.app' )
);
