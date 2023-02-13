
function initMap() {
  
    // The location of Serumpun
    let fsktm = { lat: 3.002624320550942, lng: 101.70698435872147}
    let bus2 = {lat: 2.992057, lng: 101.715435 }
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
    calculateAndDisplayRoute(directionsService,directionsDisplay,bus2,fsktm);
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