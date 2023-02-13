
function initMap() {
  
    // The location of Serumpun
    let fsktm = { lat: 3.0000461343119063, lng: 101.71098451558605}
    let bus1 = {lat: 3.000039, lng: 101.714826 }
    // The map, centered as a default (temporarily)
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: fsktm ,
      disableDefaultUI : true,
      mapTypeId: "roadmap", //default type, u have satellite,hybrid these are a part of MapTypeRegistry , a collections of those types
    });

    
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map); 
    calculateAndDisplayRoute(directionsService,directionsDisplay,bus1,fsktm);
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
  window.initMap = initMap;

  //bus navigation logics