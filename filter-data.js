const desiredColumns = [
  'County',
  'Location1_EProMIS',
  'Location2_Secondary',
  'Project Description',
  'Project Objectives',
  'Project Title',
];

const getColumns = columns => columns
  // Return an object with only column name and index
  .map(({ name }, i ) => ({ name, i }))
  // Only return the columns we care about
  .filter(({ name }) => desiredColumns.indexOf( name ) !== -1 )

const getLocation = ({ Location2_Secondary, Location1_EProMIS }) => {
  const primary = Location2_Secondary.filter( x => x );
  const secondary = Location1_EProMIS.filter( x => x );

  if ( primary.length === 2 ) {
    return [ parseFloat( primary[ 0 ]), parseFloat( primary[ 1 ])];
  } else if ( secondary.length === 2 ) {
    return [ parseFloat( secondary[ 0 ]), parseFloat( secondary[ 1 ])];
  }

  return null;
}

const getRows = ( columns, rows ) => rows
  // Return an object with only desired columns
  // Plus a location property
  .map( row => {
    const result = {};

    columns.map(({ name, i }) => result[ name ] = row[ i ]);

    result.location = getLocation( result );

    return result;
  })
  // Remove items without a location
  .filter(({ location }) => location )
  // Make the data a little prettier
  .map( row => ({
    county: row.County,
    description: row[ 'Project Description' ],
    location: row.location,
    objectives: row[ 'Project Objectives' ],
    title: row[ 'Project Title' ],
  }));

const filter = ({ data, meta }) => {
  const columns = getColumns( meta.view.columns );
  const rows = getRows( columns, data );
  return rows;
};

module.exports = filter;
