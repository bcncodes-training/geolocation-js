let map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.6, lng: 2.5},
    zoom: 8
  });


 infoWindow = new google.maps.InfoWindow;

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position)=>{
        let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Hola estoy aquí');
        infoWindow.open(map);
        map.setCenter(pos);
    }, ()=>{ handleLocationError(true, infoWindow, map.getCenter());})
} else {
    handleLocationError(false, infoWindow, map.getCenter());
}

function handleLocationError(browserHasGeolocation, infoWindow, pos){
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation?
                            'Error: El servicio de Geolocalización ha fallado':
                            'Error: Tu navegador no soporta la Geolocalización')
    infoWindow.open(map);
}

}
/*
function locate(lat, lon) {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: lat, lng: lon},
      zoom: 8
    });
}*/

