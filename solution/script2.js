/* Lógica */
let desplegable = document.getElementById('country');

let request = new XMLHttpRequest();
let listaPaises = [];
request.open('GET','https://restcountries.eu/rest/v2/all',true);
request.send();

request.onload = function() {
    listaPaises = JSON.parse(request.responseText);
    console.log(JSON.parse(request.responseText));
    printDropDown();
}


/* UI */
function printDropDown(){
desplegable.options[0]= new Option('--selecciona--')
listaPaises.forEach(e =>{
    let option = new Option(e.name);
    option.value = e.alpha2Code+' '+e.latlng;
    desplegable.add(option);
})}

desplegable.addEventListener('change', getCountryInformation);

function getNeighbours(countryCode) {
    //let countryCode = desplegable.options[desplegable.selectedIndex].value.split(' ')[0];

    if(countryCode){
        

        request.open('GET','https://api.geodatasource.com/neighbouring-countries?key=7PUKVKJJCBNQHZQOQO3ZJVBCVHZJHTEP&country_code='+countryCode,true); 
        request.send();
        request.onload = loadTextArea;
       }
}

function showInMap(position){

infoWindow.setPosition(position);
infoWindow.setContent('Esto es '+ desplegable.options[desplegable.selectedIndex].innerText);
infoWindow.open(map);
map.setCenter(position);
}

function loadTextArea(){
    let neighbours = JSON.parse(request.responseText);
    let html = '';

    neighbours.forEach(e=>{
        html+=e.country_name+' | ';
    })

    document.getElementById('neighbours').innerHTML=html;

}

function getCountryInformation(){
    let countryInformation=desplegable.options[desplegable.selectedIndex].value.split(' ');
    let countryCode = countryInformation[0];
    let position = {lat: parseInt(countryInformation[1].split(',')[0]),lng: parseInt(countryInformation[1].split(',')[1])};
    getNeighbours(countryCode);
    showInMap(position);
}


