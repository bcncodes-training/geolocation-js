function fleerPaises() {
        req = new XMLHttpRequest();

        req.open('GET', "https://restcountries.eu/rest/v2/all", true);
        req.send(null); // aqui vendrian los parámetros

        // La asociacion del evento puede estar realizado al principio si quieres.
        // 1ª generacion de AJAX, quedate pendiente de un cambio en el estado de la petición
        // req.onreadystatechange = fnCallback;
        // 2ª generación de AJAX, hasta que se termine el evento
        //req.setRequestHeader('allow-acces-origin:*');
        req.onload = fillCountries;
}

function fillCountries() {
        if (req.readyState == 4 || req.status == 200) {
                // Se puede utilizar querySelector o querySelectorAll
                let ficheroJ = req.responseText;
                paisesFichero = JSON.parse(ficheroJ);
                let objeto;
                let contenedor = document.querySelector("#country");
                contenedor.innerHTML = "";
                let element;
                paisesFichero.forEach(e => {
                        objeto = { name: e.name, alpha2Code: e.alpha2Code, latlng: e.latlng }
                        mPaises.push(objeto);
                        element = document.createElement('option');
                        element.innerHTML = e.name;
                        contenedor.appendChild(element);
                });
                /////////////////////////////////////////
                contenedor.addEventListener('change', obtenerCoord);
        }
}

function obtenerCoord(e) {
        let indice = e.currentTarget.selectedIndex;
        let objeto = mPaises[indice];
        let latitud = objeto.latlng[0];
        let longitud = objeto.latlng[1];
        fleerMapa(latitud,longitud);
}

function fleerMapa(latitud,longitud) {
        let key = "AIzaSyBdJBweq8dK5JQtYfUPl3oKoL4VBY207SI" // de esta página es un servicio que tenemos que logarnos Google Maps
        //let url = "https://maps.googleapis.com/maps/api/js?key="+key+"&callback=initMap";
        let url = "https://maps.googleapis.com/maps/api/js?key="+key;

        req = new XMLHttpRequest();
        
        req.open('GET', url, true);
        //req.setRequestHeader("Access-Control-Allow-Origin","https://api.geodatasource.com/*");
        req.send(null); // aqui vendrian los parámetros

        req.onload = initMap(latitud,longitud);
}

let req;
let mPaises = [];
let paisesFichero = "";

addEventListener('load', fleerPaises);