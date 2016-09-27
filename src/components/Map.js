import Leaflet from 'leaflet';
import Marker from './Marker';
import React from 'react';
import { renderToString } from 'react-dom/server';

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

  initMap () {
    this.map = Leaflet
      .map( 'map' )
      .setView([ this.state.lat, this.state.lng ], this.state.zoom );

    Leaflet
      .tileLayer( this.props.tileUrl, { attribution: this.props.attribution })
      .addTo( this.map );
  }

  addMarker ({ description, location, objectives, title }) {
    const [ lat, lng ] = location;

    Leaflet
      .marker([ lat, lng ])
      .addTo( this.map )
      .bindPopup( renderToString(
        <Marker
          description={ description }
          objectives={ objectives }
          title={ title }
        />
      ));
  }

  componentDidMount () {
    this.initMap();
    this.props.items.map( item => this.addMarker( item ));
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
