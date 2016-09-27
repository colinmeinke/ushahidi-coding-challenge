import Leaflet from 'leaflet';
import React from 'react';

Leaflet.Icon.Default.imagePath = 'vendor/leaflet';

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

  componentDidMount () {
    const map = Leaflet
      .map( 'map' )
      .setView([ this.state.lat, this.state.lng ], this.state.zoom );

    Leaflet
      .tileLayer( this.props.tileUrl, { attribution: this.props.attribution })
      .addTo( map );

    Leaflet
      .marker([ this.state.lat, this.state.lng ])
      .addTo( map )
      .bindPopup( 'Hello world' )
      .openPopup();
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
