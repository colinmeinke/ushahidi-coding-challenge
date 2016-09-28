import React from 'react';
import { renderToString } from 'react-dom/server';

const tallyCounties = ( tally, nextCounty ) => {
  if ( tally.hasOwnProperty( nextCounty )) {
    tally[ nextCounty ]++;
  } else {
    tally[ nextCounty ] = 0;
  }

  return tally;
};

const addCountyTally = ({ geometry, properties, type }, countyTally ) => ({
  geometry,
  properties: {
    county: properties.county,
    count: countyTally[ properties.county ] || 0,
  },
  type,
});

const getColor = c => (
  c < 10 ? '#f7fcf5' :
  c < 20 ? '#e5f5e0' :
  c < 30 ? '#c7e9c0' :
  c < 40 ? '#a1d99b' :
  c < 50 ? '#74c476' :
  c < 60 ? '#41ab5d' :
  c < 70 ? '#238b45' :
  c < 80 ? '#006d2c' :
  '#00441b'
);

const styleCounty = county => ({
  fillColor: getColor( county.properties.count ),
  weight: 2,
  opacity: 1,
  color: '#74c476',
  dashArray: '5',
  fillOpacity: 0.8,
});

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

  addChoropleth () {
    const { features, type } = this.props.counties;

    const countyTally = this.props.markers
      .map(({ county }) => county )
      .reduce( tallyCounties, {});

    const counties = {
      features: features.map( county => addCountyTally( county, countyTally )),
      type,
    };

    L
      .geoJson( counties, { style: styleCounty })
      .addTo( this.map );
  }

  componentDidMount () {
    this.initMap();
    this.addClusterLayer();
    this.addChoropleth();
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
