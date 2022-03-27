// Global variables
const apiKey = "0b1707f4c84efcdf44fdd5fd066870a9";
const today = moment().format('LL');

let cityHistory = [];

function forecast(city) {
    const urlQuery = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    $.ajax({
        url: urlQuery,
        method: 'GET',
    }).then(function (response) {
        $('#citySearched').empty();
        const citySearched = $(`
            <h2 id="citySearched">
            ${response.name} - ${today}
            </h2>
            <p>Temperature: ${response.main.temp} F</p>
            <p>Wind: ${response.wind.speed} MPH</p>
            <p>Humidity: ${response.main.humidity}</p>
        `);
    $('#citySearched').append(citySearched);
});
};

    // could not get five day forcast working

// function futureForecast(lat, lon) {
//     const urlFuture = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly,alerts&appid=${apiKey}`;

//     $.ajax({
//         url: urlFuture,
//         method: 'GET',
//     }).then(function (response) {
//         $('#weatherCards').empty();
//         for (let i = 1; i < 6; i++) {
//             const forecast = {
//                 date: response.daily[i].dt,
//                 temp: response.daily[i].temp.day,
//                 humidity: response.daily[i].humidity,
//             };

//             const currentDate = moment.unix(forecast.date).format('MM/DD/YYYY');

//             const weatherCards = $(`
//                 <div class="border border-3 border-secondary rounded col-12">
//                 <div class="card pl-3 pt-3 mb-3 bg-primary text-light"
//                         <div class="card-body">
//                             <h5>${currentDate}</h5>
//                             <p>Temp: ${forecast.temp}F</p>
//                             <p>Humidity: ${forecast.humidity}</p>
//                         </div>
//                     </div>
//             `);
//             $('#weatherCards').append(weatherCards);
//             console.log(weatherCards);
//         }
//     })
// };
// }

$('#searchButton').on('click', function (event) {
    event.preventDefault();

    const city = $('#city-input').val();
    forecast(city);
    if (!cityHistory.includes(city)) {
        cityHistory.push(city);
        const searchedCIty = $(`
            <li class="city-list">${city}</li>
        `);
        $('#cityListHistory').append(searchedCIty);
    }
    localStorage.setItem('city', JSON.stringify(cityHistory));
});

$(document).on('click', '#citySearched', function () {
    const cityList = $(this).text();
    forecast(cityList);
});
