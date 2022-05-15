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


const buttontest = document.querySelector(`#buttontest`);
const hi = document.querySelector(`#hi`);
const inputElemFrom = document.querySelector(`#travel-from`)
const inputElemto = document.querySelector(`#travel-to`)


const inputBtn = (e) => {
    const word = inputElemFrom.value;

   testConsole(word)

 }
async function testConsole(word) {
    const response = await fetch(
      `https://api.resrobot.se/v2.1/location.name?input=${word}&format=json&accessId=${mykey}`
    );
    const data = await response.json();
    console.log(data) 
  }






buttontest.addEventListener(`click`, (event) => {
  test();
});

async function test() {
  const response = await fetch(
    `https://api.resrobot.se/v2.1/trip?format=json&originId=740000001&destId=740000003&passlist=true&showPassingPoints=true&accessId=${mykey}`
  );
  const data = await response.json();
  const trip = data.Trip;
  destElem(trip);
}
function destElem(trip) {
  const destObj = trip.map((item) => {
    return { destination: item.Destination.name, origin: item.Origin.name };
  });
  console.log(destObj);

  hi.innerHTML += `<li> ${destObj[2].destination + destObj[2].origin}  </li>`;
}
