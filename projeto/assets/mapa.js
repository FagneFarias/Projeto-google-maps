let map;
let marker;

let markerPosition = {
  lat: -6.581043172515283,
  lng: -38.598065561775655
};

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: markerPosition,
    zoom: 14,
  });

  marker = new google.maps.Marker({
    map: map,
    position: markerPosition,
    draggable: true
  });

  map.addListener("click", (evt) => {
    addMarker(evt);
  });

}

function addMarker(evt) {
  marker.setPosition(evt.latLng);
}

function salvar() {

  const obj = {
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    lat: marker.getPosition().lat(),
    lng: marker.getPosition().lng()
  };

  fetch("http://localhost:3000/pontos", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  }).then(response => { alert('Inserido!') })
    .catch(error => alert('Falha ao salvar!'));

}

function exibe() {

  const url = 'http://localhost:3000/getpontos'
  fetch(url)
    .then(res => res.json())
    .then(marcadores => {
      console.log(marcadores)

      map = new google.maps.Map(document.getElementById("map"), {
        center: markerPosition,
        zoom: 14,
      });

      marcadores.forEach(function (valor, indice) {
        const marcador = { lat: marcadores[indice].st_x, lng: marcadores[indice].st_y }
        new google.maps.Marker({
          map: map,
          position: marcador
        })
      })
    })
    
}


