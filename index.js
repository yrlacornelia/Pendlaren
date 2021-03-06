const buttonElem = document.querySelector(`#position-button`);
const nearMe = document.querySelector(`#near-me-container`);

var mykey = config.MY_KEY;



buttonElem.addEventListener(`click`, () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      GetLocation(latitude, longitude);
    });
  }
});

async function GetLocation(latitude, longitude) {
  const response = await fetch(
    `https://api.resrobot.se/v2.1/location.nearbystops?input=G%C3%B6teborg&format=json&accessId=${mykey}&originCoordLat=${latitude}&originCoordLong=${longitude}`
  );
  const data = await response.json();
  const stops = data.stopLocationOrCoordLocation;
  ShowStops(stops);
}

function ShowStops(stops) {
  const stopObj = stops.map((item) => {
    return { name: item.StopLocation.name, id: item.StopLocation.extId };
  });
  stopRender(stopObj);
}

function stopRender(stopObj) {
  const stopName = stopObj
    .map((item) => {
      return `<div id="near-me" onclick=stopBtn(${item.id})> ${item.name} </div>`;
    })
    .join("");
  nearMe.innerHTML = stopName;
}

async function stopBtn(id) {
  const response = await fetch(
    `https://api.resrobot.se/v2.1/departureBoard?id=${id}&format=json&accessId=${mykey}`
  );
  const data = await response.json();
  const Departures = data.Departure;

  depElem(Departures);
}
function depElem(Departures) {
  const timeObj = Departures.map((item) => {
    const depname = item.name;
    const name = depname.substring(12, depname.length);
    return { name: name, time: item.time };
  });
  oneStop(timeObj);
}
function oneStop(timeObj) {
  console.log(timeObj);
  for (let i = 0; i < 10; i++) {
    nearMe.innerHTML += `<li> ${timeObj[i].name + timeObj[i].time}  </li>`;
    // if its less??
  }
}



/// söka själv

const inputTo = document.querySelector(`#travel-to`)
const suggestionsContainerFrom = document.querySelector(`#travel-suggestions-from`)
const suggestionsContainerTo = document.querySelector(`#travel-suggestions-to`)
const inputFrom = document.querySelector('#travel-from');
const log = document.getElementById('values');
inputFrom.addEventListener('input', updateValueFrom);
inputTo.addEventListener('input', updateValueTo);
const searchOutput = document.querySelector(`#search-output`)
let testarrayto =[]
let testarrayfrom =[]

// log.textContent = e.target.value;
function updateValueFrom(e) {
 word = e.target.value;
  valueFrom(word)
}
function updateValueTo(e) {
  word = e.target.value;
   valueTo(word)
 }
 
async function valueTo(word) {
  const response = await fetch(
    `https://api.resrobot.se/v2.1/location.name?input=${word}&format=json&accessId=${mykey}`
  );
  const data = await response.json();
  suggestionArray = data.stopLocationOrCoordLocation
 
travelSuggestionTo(suggestionArray)

}
async function valueFrom(word) {
    const response = await fetch(
      `https://api.resrobot.se/v2.1/location.name?input=${word}&format=json&accessId=${mykey}`
    );
    const data = await response.json();
    suggestionArray = data.stopLocationOrCoordLocation
   
travelSuggestionFrom(suggestionArray)

  }


  function travelSuggestionFrom(suggestionArray) {
    const suggObj = suggestionArray.map((item) => {
      return { myname: item.StopLocation.name, id: item.StopLocation.extId};
    });
    renderSuggestionsFrom(suggObj)
  
  }
  function travelSuggestionTo(suggestionArray) {
    const suggObj = suggestionArray.map((item) => {
      return { myname: item.StopLocation.name, id: item.StopLocation.extId};
    });
    renderSuggestionsTo(suggObj)
  }


  function renderSuggestionsTo(suggObj) {
    const chooseSug = suggObj.map((item) => {
      console.log(item)
      return `<div class="nd"  onclick=tyBtnTo(${item.id})> ${item.myname} </div>`;
    })
    .join("");
  suggestionsContainerTo.innerHTML = chooseSug;
 
  }
  function renderSuggestionsFrom(suggObj) {
    const chooseSug = suggObj.map((item) => {
      console.log(item)
      return `<div class="nd"  onclick=tyBtnFrom(${item.id})> ${item.myname} </div>`;
    })
    .join("");
  suggestionsContainerFrom.innerHTML = chooseSug;
 
  }



  

  async function tyBtnFrom(id) {
    const response = await fetch(
      `https://api.resrobot.se/v2.1/departureBoard?id=${id}&format=json&accessId=${mykey}`
    );
    const data = await response.json();
   const mydag = data.Departure[1].stop
   const myid = data.Departure[1].stopExtId
extractId(myid)
testarrayfrom.push(myid)
   setinputFrom(mydag)
  }
  async function tyBtnTo(id) {
    const response = await fetch(
      `https://api.resrobot.se/v2.1/departureBoard?id=${id}&format=json&accessId=${mykey}`
    );
    const data = await response.json();
   const mydag = data.Departure[1].stop
   const myotherid = data.Departure[1].stopExtId
   testarrayto.push(myotherid)
extractId(myotherid)
   setinputTo(mydag)
  }

function setinputFrom(mydag) {
  console.log(mydag)
  inputFrom.value = mydag

}
function setinputTo(mydag) {
  console.log(mydag)
  inputTo.value = mydag

}

function extractId(myids) {
 console.log(testarrayfrom)
console.log(testarrayto)
}

 function inputBtn(params) {
  let idTo = testarrayto[testarrayto.length - 1];
  let idFrom = testarrayfrom[testarrayfrom.length - 1];
 console.log(idFrom + idTo)
loelo(idTo, idFrom)
}
async function loelo(idTo, idFrom) {
   const response = await fetch(
    `https://api.resrobot.se/v2.1/trip?format=json&originId=${idFrom}&destId=${idTo}&passlist=true&showPassingPoints=true&accessId=${mykey}`
  );
  const data = await response.json();
  const trip = data.Trip

destElem(trip);
}
function destElem(trip) {
  const destObj = trip.map((item) => {
  return { destination: item.Destination.name, origin: item.Origin.name };
});
console.log(destObj);

searchOutput.innerHTML += `<li> ${destObj[2].destination + " - " +  destObj[2].origin}  </li>`;
}
// connect with serviceworker.js? 

//// profilepicture
const cameraButton = document.querySelector('#start-camera');
const videoElem = document.querySelector('#camera');
const takePictureButton = document.querySelector('#take-picture');
const canvas = document.querySelector('#picture');
const galleryElem = document.querySelector('#gallery');

const ctx = canvas.getContext('2d');
let stream;
const images = [];

cameraButton.addEventListener('click', async () => {
    if ('mediaDevices' in navigator) {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        console.log(stream);
        videoElem.srcObject = stream;
    }
});

takePictureButton.addEventListener('click', () => {
    ctx.drawImage(videoElem, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png'); // Konverterar det till en png-bild

    images.push({
        id: images.length,
        image: imageData        
    });

    // localStorage.setItem('cameraApp', JSON.stringify(images));
});

function createImage(image) {
    const imageElem = document.createElement('img');
    imageElem.setAttribute('src', image.image);

    galleryElem.append(imageElem);
}

function getImages() {
    const images = JSON.parse(localStorage.getItem('cameraApp'));

    for(const image of images) {
        createImage(image);
    }
}

getImages();

