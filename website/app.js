/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=f3671e85e005e03fc6b9baac24025fda&units=metric'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) + "." + d.getDate() + "." + d.getFullYear();


//Run Function Display Info When on click Event Happened
const button = document.getElementById("generate").addEventListener("click", displayInfo);

function displayInfo() {
  zipCode = document.getElementById("zip").value;
  personFeelings = document.getElementById("feelings").value;

  if (zipCode=='') {
    alert("Please Enter Zip Code");

  } else {

      getWeather(baseURL,zipCode,apiKey).then(function (data) {
      //console.log(data);
      postWeather("/updateWeatherData", {temp: data,date: newDate, feeling: personFeelings});
      updateUI('/retriveWeatherData');
    });
    
  }
}


/*function to fetch weather data*/
const getWeather = async (baseURL,zip,key) => {
  const res = await fetch(baseURL+zip+key);
  try {
    const data = await res.json();
    //console.log(data.main.temp);
    return data.main.temp;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};


/* Function to POST weather data */
const postWeather = async (url = "", data = {}) => {
  //console.log(data)
    const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  try {
    const newData = await response.json();
    //console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

/*Function to update UI */

const updateUI = async (URL) => {
  const res = await fetch(URL);
  try {
    const data = await res.json();
    document.getElementById('date').innerHTML = "Date : "+data.date;
    document.getElementById('temp').innerHTML = "Temperature : "+data.temp;
    document.getElementById('content').innerHTML ="Your Feelig : "+data.feeling;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};
