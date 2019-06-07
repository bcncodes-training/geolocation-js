let map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 4
  });


 infoWindow = new google.maps.InfoWindow;

if(navigator.geolocation) {
    

    
    /* 
    navigator.geolocation.getCurrentPosition((position)=>{
        let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude

       
}; 
    }, ()=>{ handleLocationError(true, infoWindow, map.getCenter());}) */
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

