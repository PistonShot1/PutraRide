
function initMap() {

  // The location of Serumpun
  let serumpun_bs = { lat: 2.9920702890523048, lng: 101.71540064213724 }
  // The map, centered as a default (temporarily)
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: serumpun_bs,
    disableDefaultUI: true,
    mapTypeId: "roadmap", //default type, u have satellite,hybrid these are a part of MapTypeRegistry , a collections of those types
  });
  
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  directionsDisplay.setMap(map);


  //function to add marker with infowindow
  function addMarker(props) {
    var marker = new google.maps.Marker({
      position: props.coords,
      map: map,
    });
    var infoWindow1 = new google.maps.InfoWindow({
      content: props.content
    })

    marker.addListener('mousedown', () => {
      infoWindow1.open(map, marker)

    });
    marker.addListener('mouseup', () => {
      infoWindow1.close()

    });

  }
  document.getElementById("confirm_button").onclick=() =>{
    window.location.href = "/Navigation"

  }

  //supposed need to be handled by server and backend
  //requires duplex communication for best experience
  //refer WebSocket or Socket.IO
  const from = document.getElementById('from');
  const to = document.getElementById('to');

  //zooms and center the map when from location is selected
  from.onclick = () => {
    if (from.value != "") {
      let coordinate = busStopCoordinate(from)
      map.setZoom(18)
      map.setCenter(coordinate)

    }
  }

  //function when to value is set
  //shows the route 
  to.onclick = ()=>{

    if(to.value !="" && from.value !=""){
        let start  = busStopCoordinate(from)
        let end = busStopCoordinate(to)
        calculateAndDisplayRoute(directionsService,directionsDisplay, start, end)
    }
  }


  //adding markers for each location
  for (var i = 0; i < markers.length; i++) {
    addMarker(markers[i]);
  }

}

function calculateAndDisplayRoute(directionsService, directionsRenderer, start , end) {
    directionsService.route({
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
            directionsRenderer.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}


// The markers, all position and coordinates of defined bus stopss
const markers = [

  {
    coords: { lat: 2.9920702890523048, lng: 101.71540064213724 },
    content: '<label style="font-size:10px;">Serumpun Bus Stop</label>'
  },
  {
    coords: { lat: 3.000034351555422, lng: 101.71484868484079 },
    content: '<label style="font-size:10px;">FBMK BUS STOP</label>'
  },
  {
    coords: { lat: 3.0000461343119063, lng: 101.71098451558605 },
    content: '<label style="font-size:10px;">FSKTM bus stop</label>'
  },
  {
    coords: { lat: 3.000665191429673, lng: 101.70688253030212 },
    content: '<label style="font-size:10px;">Faculty Science bus stop </label>'
  },
  {
    coords: { lat: 3.002624320550942, lng: 101.70698435872147 },
    content: '<label style="font-size:10px;">library bus stop </label>'
  },
  {
    coords: { lat: 3.004303669460791, lng: 101.70867038656043 },
    content: '<label style="font-size:10px;">faculty of environment studies bus stop </label>'
  },
  {
    coords: { lat: 3.001311880679444, lng: 101.70972506936066 },
    content: '<label style="font-size:10px;">central parking bus stop</label>'
  },
  {
    coords: { lat: 2.9917777087602584, lng: 101.70755882168878 },
    content: '<label style="font-size:10px;">PFC bus stop</label>'
  }

]
function busStopCoordinate(stopName){
  let stopCoordinate = { lat: 0, lng: 0 }
  switch (stopName.value) {
    case "Serumpun":
      stopCoordinate ={ lat: 2.9920702890523048, lng: 101.71540064213724 }
      break;
    case "FBMK":
      stopCoordinate = { lat: 3.000034351555422, lng: 101.71484868484079 }
      break;
    case "FSKTM":
      stopCoordinate = { lat: 3.0000461343119063, lng: 101.71098451558605 }
      break;
    case "Fakulti Sains":
      stopCoordinate = { lat: 3.000665191429673, lng: 101.70688253030212 }
      break;
    case "Fakulti Perhutanan":
      stopCoordinate = { lat: 3.004303669460791, lng: 101.70867038656043 }
      break;
    case "Sultan Abdul Samad Library":
      stopCoordinate = { lat: 3.002624320550942, lng: 101.70698435872147 }
      break;
    case "Central Parking":
      stopCoordinate = { lat: 3.001311880679444, lng: 101.70972506936066 }
      break;
    case "PFC/KPZ":
      stopCoordinate = { lat: 2.9917777087602584, lng: 101.70755882168878 }
      break;
  }
  return stopCoordinate;
}

window.initMap = initMap;