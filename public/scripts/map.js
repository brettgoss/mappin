
//map and default startingplace
var mymap = L.map('mapid').setView([48.427, -123.365], 13);
//map tile
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
   attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
   maxZoom: 18,
   id: 'cecstar.1oobi125',
   accessToken: 'pk.eyJ1IjoiY2Vjc3RhciIsImEiOiJjaXVya2h2MDcwMDR1Mm5ueWtxOTF3Z3hjIn0.RDmEH1N_eFPZv7bJeUVqbA'
}).addTo(mymap);