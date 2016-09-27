import express from 'express';
import path from 'path';

const app = express();

app.use( express.static( 'dist/assets' ));

app.get( '/', ( req, res ) => {
  res.sendFile( path.join( `${ __dirname }/layout.html` ));
});

app.listen( 3000, () => {
  console.log( 'Listening on http://localhost:3000' );
});
