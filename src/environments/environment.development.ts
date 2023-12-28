export const environment = {
    const url = 'https://weather-api99.p.rapidapi.com/weather?city=Auckland';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '3d6c674dd9mshe81aa8d8f0d19b7p1c1555jsn09d8683e2326',
        'X-RapidAPI-Host': 'weather-api99.p.rapidapi.com'
    }
};

// Assuming this code is part of a function or an asynchronous context
async function fetchWeather() {
    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();  // Assuming the response is JSON data
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

// Call the function to fetch weather data
fetchWeather();

};
