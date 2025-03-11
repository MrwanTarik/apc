// AccuWeather API Key
const API_KEY = "4S4ED83RWxOAdR1NZlrSYocidsyzZ1TQ"


// Default to cloudy if icon not found
const defaultIcon = "./images/weather/cloudy.svg"

// DOM elements
const cityDropdown = document.getElementById("cityDropdown")
const weatherIcon = document.getElementById("weatherIcon")
const temperatureElement = document.getElementById("temperature")



// Function to fetch weather data for a location key
function fetchWeatherByLocationKey(locationKey) {
  fetch(`https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_KEY}&details=true`)
    .then((response) => response.json())
    .then((weatherData) => {
      if (weatherData && weatherData.length > 0) {
        const temp = Math.round(weatherData[0].Temperature.Metric.Value)
        temperatureElement.textContent = `${temp}°`
        const iconCode = weatherData[0].WeatherIcon.toString().padStart(2, '0')
        weatherIcon.src = `https://developer.accuweather.com/sites/default/files/${iconCode}-s.png`
        weatherIcon.alt = weatherData[0].WeatherText
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error)
      weatherIcon.src = defaultIcon
    })
}

// Function to get location by geolocation
function getLocationByGeolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude

        fetch(
          `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${lon}`,
        )
          .then((response) => response.json())
          .then((locationData) => {
            if (locationData && locationData.Key) {
              // Check if the location is in Jordan
              if (locationData.Country.ID === "JO") {
                // Find and select the matching city in dropdown
                const options = Array.from(cityDropdown.options)
                const matchingOption = options.find((option) => option.value === locationData.Key)

                if (matchingOption) {
                  cityDropdown.value = locationData.Key
                } else {
                  // If city not in dropdown, default to Amman
                  cityDropdown.value = "212692" // Amman's location key
                }
              } else {
                // If not in Jordan, default to Amman
                cityDropdown.value = "212692" // Amman's location key
              }

              // Fetch weather for the selected city
              fetchWeatherByLocationKey(cityDropdown.value)
            }
          })
          .catch((error) => {
            console.error("Error fetching location data:", error)
            // Default to Amman on error
            cityDropdown.value = "212692"
            fetchWeatherByLocationKey("212692")
          })
      },
      (error) => {
        console.error("Geolocation error:", error)
        // Default to Amman if geolocation fails
        cityDropdown.value = "212692"
        fetchWeatherByLocationKey("212692")
      },
    )
  } else {
    console.error("Geolocation is not supported by this browser")
    // Default to Amman if geolocation not supported
    cityDropdown.value = "212692"
    fetchWeatherByLocationKey("212692")
  }
}

// Event listener for dropdown change
cityDropdown.addEventListener("change", function () {
  const selectedLocationKey = this.value
  fetchWeatherByLocationKey(selectedLocationKey)
})

// Initialize weather on page load
document.addEventListener("DOMContentLoaded", () => {
  // Try to get location by geolocation first
  getLocationByGeolocation()
})

