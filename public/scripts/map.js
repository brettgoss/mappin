$(function() {

// Loads map with default startingplace
var map = L.map('mapid').setView([48.457, -123.365], 12);

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
          weight: 5
        }
      },
      polygon: {
        allowIntersection: false, // Restricts shapes to simple polygons
        drawError: {
          color: '#e1e100', // Color the shape will turn when intersects
          message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
        },
        shapeOptions: {
          color: '#37d2cc'
        }
      },
      circle: false, // Turns off this drawing tool
      rectangle: false,
      marker: {}
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

    }

    editableLayers.addLayer(layer);
  });

  // Map Title Function
  $('#mapname').on('submit', function(event) {

    event.preventDefault()
    var mapName = $('#mapname').children('input').val();
    var user = $('#metaspan').data('user');

    $('.mapstate').attr({'data-title':mapName});
    $('.mapstate').attr({'data-user':user});

    var mapState = document.getElementsByClassName('mapstate')[0];
    var mapTitle = mapState.dataset.title;
    $('.cur-title').text(mapTitle);
  })

  $('#saveMap').on('submit', function(event) {

    event.preventDefault();
    // console.log('testing');
    var data = editableLayers.toGeoJSON();
    var bounds = map.getBounds();

    data.bbox = [[
      bounds.getSouthWest().lng,
      bounds.getSouthWest().lat,
      bounds.getNorthEast().lng,
      bounds.getNorthEast().lat
    ]];

    var jsonStr = JSON.stringify(data);
    var title   = $('.cur-title').text();
    var userid  = $('#metaspan').data('id')

    $('.mapstate').attr({'data-title':title});
    $('.mapstate').attr({'data-user':userid});
    $('.mapstate').attr({'data-json':jsonStr});

    var mapState = $('.mapstate').data('json');
    var mapName  = $('.mapstate').data('title');
    var userName = $('.mapstate').data('user');

    var encodedMapState = encodeURIComponent(jsonStr);

    $.ajax({
      method: "POST",
      url: "/maps/export",
      data: "user_id=" + userName + "&mapname=" + mapName + "&fc_mapstate=" + encodedMapState,
      dataType: 'json'
    }).done(function (data){
      // console.log(data)
    })

  })

  function loginCheck(){
    var id = $('#metaspan').data('id')
    if(id > 0) {
      console.log("user is logged in")

      $.ajax({
        type: 'GET',
        url: "/maps"
      })
      .done((data) => {
        for(var i = 0; i < data.length; i++){
          if(data[i].user_id == id){
            var mapname = data[i].mapname;
            var mapstate = data[i].fc_mapstate;
            var jsonstring = JSON.stringify(mapstate)

            $('#mymaps').append(`<a href='#' data-mapstate=${jsonstring} class='myMap list-group-item'>${mapname}`)
          }
        }
        $('.myMap').on('click', function (event){
          event.preventDefault();
          var mapstate = $(this).data('mapstate')
          loadMap(mapstate)
        })
      })
    }
  }
  loginCheck()
  $('.myMap').on('click', function (event){
    event.preventDefault();
    var mapstate = $(this).data('mapstate')
    loadMap(mapstate)
  })



  function loadMap(mapName){

      var bnds = mapName.bbox[0];
      var southWest = L.latLng(bnds[1], bnds[0]),
          northEast = L.latLng(bnds[3], bnds[2]),
          bounds = L.latLngBounds(southWest, northEast);
      map.fitBounds(bounds)
      L.geoJson(mapName).addTo(map);

    }
})
