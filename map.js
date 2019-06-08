let map;

function initMap(latitud, longitud) {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: latitud, lng: longitud },
        //center: { lat: -34.397, lng: 150.644 },
        zoom: 6
    });

    // Geolocalización nuestra actual
    let infoWindow = new google.maps.InfoWindow;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Hola estoy aquí');
            infoWindow.open(map);
            map.setCenter(pos);

            // Obtener la distancia entre mi Geolocalización y las coordenadas del país.
            let distancia = calcularDistancia(pos.lat, pos.lng, latitud, longitud);
            let contenedor = document.querySelector("#distancia");
            contenedor.innerText = "Distancia del pais, desde la capital hasta nuestra localización: " + distancia + "Km.";

        }, () => { handleLocationError(true, infoWindow, map.getCenter()); })
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: El servicio de Geolocalización ha fallado' :
            'Error: Tu navegador no soporta la Geolocalización')
        infoWindow.open(map);
    }
}

function calcularDistancia(latitudLoc, longitudLoc, latitudPais, longitudPais) {

    let Distancia = Dist(latitudLoc, longitudLoc, latitudPais, longitudPais);   //Retorna numero en Km

    return Distancia

    function Dist(lat1, lon1, lat2, lon2) {
        rad = function (x) { return x * Math.PI / 180; }

        var R = 6378.137;                     //Radio de la tierra en km
        var dLat = rad(lat2 - lat1);
        var dLong = rad(lon2 - lon1);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;

        return d.toFixed(3);                      //Retorna tres decimales
    }
}
