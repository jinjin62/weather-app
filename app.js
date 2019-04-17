window.addEventListener("load", () => {
  let long;
  let lat;

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
        });
    });
  }
  //else {
  //     // if user does not agree
  //   }
});
