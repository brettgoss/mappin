$(function() {
// Loads map with default startingplace
var map = L.map('mapid').setView([48.427, -123.365], 13);
//map tile
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
   attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
   maxZoom: 18,
   id: 'cecstar.1oobi125',
   accessToken: 'pk.eyJ1IjoiY2Vjc3RhciIsImEiOiJjaXVya2h2MDcwMDR1Mm5ueWtxOTF3Z3hjIn0.RDmEH1N_eFPZv7bJeUVqbA'
}).addTo(map);

var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

var options = {
    position: 'topright',
    draw: {
        polyline: {
            shapeOptions: {
                color: '#f357a1',
                weight: 10
            }
        },
        polygon: {
            allowIntersection: false, // Restricts shapes to simple polygons
            drawError: {
                color: '#e1e100', // Color the shape will turn when intersects
                message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
            },
            shapeOptions: {
                color: '#bada55'
            }
        },
        circle: false, // Turns off this drawing tool
        rectangle: {
            shapeOptions: {
                clickable: false
            }
        },
        marker: {

        }
    },
    edit: {
        featureGroup: editableLayers, //REQUIRED!!
        remove: true
    }
};

var drawControl = new L.Control.Draw(options);
map.addControl(drawControl);

map.on('draw:created', function (e) {
    var type = e.layerType,
        layer = e.layer;

    if (type === 'marker') {
        layer.bindPopup('A popup!');
    }

    editableLayers.addLayer(layer);
});

document.getElementById('export').onclick = function(event) {
            // Extract GeoJson from featureGroup
            var data = editableLayers.toGeoJSON();

            // Stringify the GeoJson
            var convertedData = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
            // Create export
            document.getElementById('export').setAttribute('href', 'data:' + convertedData);

            document.getElementById('export').setAttribute('download','data.geojson');
        event.preventDefault();
        var newData = [];
        for(var i = 0; i < data.features.length; i++) {
          newData = data.features[i].geometry.coordinates;
          $('#content').children('ul').append(`<li>${newData}</li>`);
          console.log(newData);
        }
    // $.ajax({
    //   method: "POST",
    //   url: "/exports",
    //   data: data,
    //   dataType: 'json'
    // }).done(function (data){
      // $('#content').children('ul').append(`<li>${newData}</li>`);
    // })
}
})
