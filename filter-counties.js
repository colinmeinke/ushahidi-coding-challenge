const getCounty = ({ geometry, properties, type }) => ({
  geometry,
  properties: {
    county: properties.COUNTY_NAM,
  },
  type,
});

const filter = ({ features, type }) => ({
  features: features.map( getCounty ),
  type,
});

module.exports = filter;
