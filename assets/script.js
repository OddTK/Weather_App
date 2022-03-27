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
    // code removed

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
