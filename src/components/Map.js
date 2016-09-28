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

  initMap () {
    this.map = L
      .map( 'map' )
      .setView([ this.state.lat, this.state.lng ], this.state.zoom );

    L
      .tileLayer( this.props.tileUrl, { attribution: this.props.attribution })
      .addTo( this.map );
  }

  addClusterLayer () {
    const cluster = L.markerClusterGroup();

    this.props.markers.map(({ lat, lng, content }) => {
      cluster.addLayer( L
        .marker({ lat, lng })
        .bindPopup( renderToString( content ))
      );
    });

    this.map.addLayer( cluster );
  }

  componentDidMount () {
    this.initMap();
    this.addClusterLayer();
  }

  render () {
    return (
      <section className="map" id="map"></section>
    );
  }
};

Map.defaultProps = {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
};

export default Map;
