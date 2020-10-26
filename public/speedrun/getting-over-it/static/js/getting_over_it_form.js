/* Helper functions */
function jsonParse(response) {
  if (response.status === 200) {
    return response.json();
  }
  throw new Error(`Non HTTP OK response`);
}

function jsonFetch(url) {
  return  fetch(url).then(jsonParse);
}

function jsonPost(url = ``, data = {}) {
  const options = {
    method: `POST`, // *GET, POST, PUT, DELETE, etc.
    cache: `no-cache`, // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      'Content-Type': `application/json`,
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  };
  return fetch(url, options).then(jsonParse);
}

function getBaseUrl() {
  const re = new RegExp(/^.*\//);
  return re.exec(window.location.href);
}

/* Main script */

document.getElementById(`submitSpeedrun`).addEventListener(`click`, async (event) => {
  event.preventDefault(); // we handle the interaction with the server rather than browsers form submission

  const speedrunData = extractSpeedrunData();
  console.log(speedrunData);

  try {
    const response = await jsonPost(`${getBaseUrl()}/api/getting-over-it`, speedrunData);
    console.log(response);
  }
  catch (err) {
    console.log(err);
  }
});

function extractSpeedrunData() {
  const data = {};

  data.player = document.getElementById(`player`).value;
  data.time   = extractSpeedrunTime();
  data.date   = document.getElementById(`date`).value;

  return data;
}

function extractSpeedrunTime() {
  let hours          = document.getElementById(`hours`).value;
  let minutes        = document.getElementById(`minutes`).value;
  let seconds        = document.getElementById(`seconds`).value;
  const milliseconds = document.getElementById(`milliseconds`).value;

  // Convert to milliseconds
  hours   *= 3600000;
  minutes *= 60000;
  seconds *= 1000;

  return hours + minutes + seconds + milliseconds;
}
