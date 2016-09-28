# Ushahidi coding challenge

This project creates a map based on
[data on donor and government funded projects in Kenya](https://www.opendata.go.ke/-National-Accounts-And-Inflation/Donor-and-Government-funded-projects-map-2013-2015/5mtp-qs2h).

Each project is given a marker that displays project
information in a popup when pressed.

Markers are clustered to reduce crowding.

[Kenyan county boundaries](https://github.com/mikelmaron/kenya-election-data/blob/master/data/counties.geojson)
are drawn on the map, and shaded based on project count.

## Getting started

```
npm install
npm run build
npm start
```

You should now be able to view the project at
[http://localhost:3000](http://localhost:3000).

You can also view a live version of the project at
[https://ushahidi-coding-challenge.now.sh](https://ushahidi-coding-challenge.now.sh).

## Approach

A simple [express server](https://expressjs.com) loads the
layout and local assets.

The layout includes the JS and CSS assets for 
[Leaflet](https://github.com/Leaflet/Leaflet), and the
[Leaflet.markercluster plugin](https://github.com/Leaflet/Leaflet.markercluster).
These are served over the [unpkg.com CDN](http://unpkg.com).

A basic [React](https://facebook.github.io/react) app is
loaded client-side, which includes a `Map` component. The
`Map` component hooks into the Leaflet API.

This project also demonstrates:

- CSS & JS build process using [Gulp](http://gulpjs.com).
- [BrowserSync](https://www.browsersync.io/docs/gulp) for live
  reloading of the browser.
- Clean up/optimization of data during build process.
- Using [Mapbox](https://www.mapbox.com/api-documentation)
  tiles with Leaflet.
- Deployment to [now](https://zeit.co/now) with a Dockerfile.

## Improvements, learnings & notes

- I would have liked to render some form of UI server-side,
  even though it appears Leaflet is client-side only.
- It would be nice filter out markers with no title,
  description or objective.
- As Leaflet manipulates the DOM directly, I'm not sure how
  well it works with React philosophically. In my current
  setup React only initializes Leaflet, handing further
  control of the map over to Leaflet.
- The map currently waits to load until all data is fully
  downloaded. To improve perceived performance it would be a
  good idea to load the map straight away, and then once the
  data is ready add markers/county boundaries.
- Bundle size if pretty huge, I didn't have time to
  investigate why.
- I'd also like to see if any extra KB's can be trimmed of
  the source data.

## Credits

- [Leaflet documentation](http://leafletjs.com/reference-1.0.0.html)
- [React Leaflet](https://github.com/PaulLeCam/react-leaflet)
  – I didn't end up using this, but the source was a good
  reference.

See the dependencies in [package.json](./package.json) for a
full list of third-party libraries.
