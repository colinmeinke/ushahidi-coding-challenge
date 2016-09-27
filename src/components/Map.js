import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import React from 'react';
import { renderToString } from 'react-dom/server';

class Map extends React.Component {
  constructor ( props ) {
    super( props );

    const { initialLat, initialLng, initialZoom } = props;

    this.state = {
      lat: initialLat,
      lng: initialLng,
      zoom: initialZoom,
    };
  }

  render () {
    return (
      <LeafletMap
        center={[ this.state.lat, this.state.lng ]}
        className="map"
        zoom={ this.state.zoom }
      >
        <TileLayer
          attribution={ this.props.attribution }
          url={ this.props.tileUrl }
        />
        { this.props.children }
      </LeafletMap>
    );
  }
};

Map.defaultProps = {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
};

export default Map;
