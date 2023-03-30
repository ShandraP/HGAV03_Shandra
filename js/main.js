//alert ('Hello, word!');
//console. log('Hello, world!');

let message = 'Hello'
//alert (message)

// openlayers kaart 
const styleFunction = function (feature) {
  console.log(feature.get('fill'))
  let fillcolor = feature.get('fill','fill-opacity')
  return new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: fillcolor,
        width: 2,
      }),
      fill: new ol.style.Fill({
        color: fillcolor,
        opacity: 0.5
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
        url: '../data/map.geojson',
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
require(["esri/config", "esri/WebMap", "esri/views/MapView"], function(esriConfig, WebMap, MapView) {
esriConfig.apiKey = "AAPKa6565db929d64e039322439e40c6c8cbnrn-rmssR8Bw3uQHVqe1QdsZQVsFMbBGKnRr5dj2efccO_YrPKuw2isBI-E0PLer";

//const arcgismap = new Map({
  //basemap: "arcgis-navigation"
//});

const arcgismap = new WebMap ({
  basemap: "arcgis-navigation",
  portalItem:{
  id: "aab0ccce23b149de9dfcd64d07939395"
   }
});

const view = new MapView({
  container: "arcgismap",
  map: arcgismap,
  //center: [0, 30],
  zoom: 2
});

});

// Leaflet kaart
var leafletmap = L.map('leafletmap').setView([52.2446266, 4.8317337], 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(leafletmap);


//leaflet kaart data opvraag 
let mijnlaag = L.geoJSON().addTo(leafletmap);
const mijnEersteAPI = 'https://api.pdok.nl/bzk/locatieserver/search/v3_1/lookup?id=wpl-76c875f4384f48235cc78e32837648c5&wt=json&fl=*'

fetch(mijnEersteAPI, {})
.then(response => response.json ())
.then(data => { 
  console.log(data.response.docs[0].geometrie_ll)
  let geojsonFeature = Terraformer.wktToGeoJSON(data.response.docs[0].geometrie_ll)
  mijnlaag.addData(geojsonFeature);
  });

//Openlayers met GeoJSON -> zie presentatie 

// Leaflet WMS inladen via GeoServer
L.tileLayer.wms('http://localhost:8080/geoserver/ows', {
  'layers': 'hgav03:Gemeentes',
  'styles': 'polygon',
  'srs': 'EPSG:28992',
  'format': 'image/png',
  'opacity': 0.5
 }) .addTo(leafletmap);


// Maplibre kaart
var map = new maplibregl.Map({
  container: 'maplibre',
  style: 'https://demotiles.maplibre.org/style.json', // stylesheet location
  center: [52.2446266, 4.8317337], // starting position [lng, lat]
  zoom: 9 // starting zoom
});

var marker = new maplibregl.Marker()
        .setLngLat([52.2446266, 4.8317337])
        .addTo(map);





