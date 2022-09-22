const form = document.querySelector("form");
const resultDiv = document.querySelector(".result");

const renderData = (data) => {
  const iconUrl = "http://openweathermap.org/img/wn/";
  let periodOfDay;

  if (data.weather[0].icon.includes("d")) {
    periodOfDay = "day";
  } else if (data.weather[0].icon.includes("n")) {
    periodOfDay = "night";
  }

  return `
    <div class="output-container ${periodOfDay}">
      
      <p>${data.name}</p>
      <img 
        src="${iconUrl + data.weather[0].icon}@2x.png" 
        alt="${data.weather[0].main}" 
      />
      <h2>${data.weather[0].description}</h2>
      <h1>${data.main.temp} °C</h1>
    </div>
  `;
};

form.onsubmit = (e) => {
  e.preventDefault();
  const city = form.elements["city"].value;

  fetchData(city);
};

const fetchData = async (city) => {
  const response = await axios({
    method: "get",
    url: "https://api.openweathermap.org/data/2.5/weather",
    params: {
      q: city,
      appid: "d2a68d69815b93fa7661e4cdda6a99db",
      units: "metric",
    },
  });

  showResult(response.data);
  form.reset();
};

const showResult = (data) => {
  resultDiv.innerHTML += renderData(data);
};

// For building purpose
// window.onload = fetchData("Lagos");
