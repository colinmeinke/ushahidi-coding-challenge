import express from 'express';
import path from 'path';

const app = express();

app.get( '/', ( req, res ) => {
  res.sendFile( path.join( `${ __dirname }/layout.html` ));
});

app.get( '/client.js', ( req, res ) => {
  res.sendFile( path.join( `${ __dirname }/client.js` ));
});

app.get( '/styles.css', ( req, res ) => {
  res.sendFile( path.join( `${ __dirname }/styles.css` ));
});

app.listen( 3000, () => {
  console.log( 'Listening on http://localhost:3000' );
});
