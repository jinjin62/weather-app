window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      //https://cors-anywhere.herokuapp.com
      const proxy = "https:cors-anywhere.herokuapp.com/"; // proxy for CORS work around on localhost;
      const api = `${proxy}https://api.darksky.net/forecast/ced5f148eca3e1ea5493506d3864216c/${lat},${long}`;
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const { temperature, summary, icon } = data.currently; // pull temp, summary from data.currently
          //Set DOM Elements from the API;
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          // set icon;
          setIcons(icon, document.querySelector(".icon"));
        });
    });
  }
  //else {
  //     // if user does not agree
  //   }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
