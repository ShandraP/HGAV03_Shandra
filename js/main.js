
// openlayers kaart 
const styleFunction = function (feature) {
  console.log(feature.get('fill'))
  let fillcolor = feature.get('fill')
  return new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: fillcolor,
      width: 2,
    }),
    fill: new ol.style.Fill({
      color: fillcolor,
    }),
  });
};


const openlayersmap = new ol.Map({
  target: 'openlayersmap',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
    new ol.layer.Vector({
      source: new ol.source.Vector({
        url: './data/map.geojson',
        format: new ol.format.GeoJSON(),
      }),
      style: styleFunction,
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([0, 30]),
    zoom: 0,
  }),
});




// Arcgis kaart 
require(["esri/config", "esri/WebMap", "esri/views/MapView"], function (esriConfig, WebMap, MapView) {
  esriConfig.apiKey = "AAPKa6565db929d64e039322439e40c6c8cbnrn-rmssR8Bw3uQHVqe1QdsZQVsFMbBGKnRr5dj2efccO_YrPKuw2isBI-E0PLer";

  const arcgismap = new WebMap({
    portalItem: {
      id: "aab0ccce23b149de9dfcd64d07939395",
    }
  });

  const view = new MapView({
    container: "arcgismap",
    map: arcgismap,
    zoom: 2
  });

});



// Maplibre kaart
var map = new maplibregl.Map({
  container: 'maplibre',
  style: 'https://api.maptiler.com/maps/83470e09-666c-4c16-af25-276d9fdcc1ec/style.json?key=wIA2prziu4sAGGyOhl8h',
  center: [5.222124, 52.371353],
  zoom: 7
});

// Marker Nieuwveen
var popup = new maplibregl.Popup({ offset: 25 }).setText(
  'Mijn gezin en ik.'
  );
marker = new maplibregl.Marker()
  .setLngLat([4.755741, 52.201008])
  .setPopup(popup)
  .addTo(map);

// Marker Purmerend
var popup = new maplibregl.Popup({ offset: 25 }).setText(
  'Tante 1.'
  );
marker = new maplibregl.Marker()
  .setLngLat([4.956242, 52.506325])
  .setPopup(popup)
  .addTo(map);

//Marker Haarlem 
var popup = new maplibregl.Popup({ offset: 25 }).setText(
  'Tante 2.'
  );
marker = new maplibregl.Marker()
  .setLngLat([4.637727, 52.381466])
  .setPopup(popup)
  .addTo(map);
//Marker Amsterdam
var popup = new maplibregl.Popup({ offset: 25 }).setText(
  'Grootouders.'
  );
marker = new maplibregl.Marker()
  .setLngLat([4.834108, 52.358198])
  .setPopup(popup)
  .addTo(map);


// Leaflet kaart
var leafletmap = L.map('leafletmap').setView([52.201008, 4.755741], 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 12,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(leafletmap);


//Leaflet kaart data opvraag 
let mijnlaag = L.geoJSON().addTo(leafletmap);
const mijnEersteAPI = 'https://api.pdok.nl/bzk/locatieserver/search/v3_1/lookup?id=wpl-76c875f4384f48235cc78e32837648c5&wt=json&fl=*'

fetch(mijnEersteAPI, {})
  .then(response => response.json())
  .then(data => {
    console.log(data.response.docs[0].geometrie_ll)
    let geojsonFeature = Terraformer.wktToGeoJSON(data.response.docs[0].geometrie_ll)
    mijnlaag.addData(geojsonFeature);
  });


// Leaflet WMS inladen via GeoServer
L.tileLayer.wms('http://localhost:8080/geoserver/ows', {
  'layers': 'HGAV03:Gemeentes',
  'styles': 'polygon',
  'srs': 'EPSG:28992',
  'format': 'image/png',
  'opacity': 0.5
}).addTo(leafletmap);






