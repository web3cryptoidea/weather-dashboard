 
var apiKey = "79ed2eddbec624b551c57e8e4cbb641f";

//function for 5 cards with next days forecast
function fivedaysforecast(response) {
        
    for (var i=6; i<=response.list.length; i=i+7){
        console.log(response.list[i]);
        var cardContainer = $('<div>');
        cardContainer.addClass('col-2');
        var card = $('<div>');
        card.addClass('card');

        var cityInfo = $(`<p>${response.list[i].dt_txt.substring(0, 10)}</p>`);
        var iconUrl = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png");
        var tempInfo = $(`<p>${"Temp.: " + response.list[i].main.temp + "C°"}</p>`); 
        var humInfo = $(`<p>${"Humidity: " + response.list[i].main.humidity + "%"}</p>`);
        var windInfo = $(`<p>${"Wind: " + response.list[i].wind.speed + "mph"}</p>`);
        
        card.append(cityInfo);
        card.append(iconUrl);
        card.append(tempInfo);
        card.append(humInfo);
        card.append(windInfo);
        $('#forecast').append(card);
        
    }
}
     //Main snippet of code for retriving weather data from search button
    $("#search-button").click(function(event) {
        event.preventDefault();
        let city = $("#search-input").val().trim();
        var queryURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            
            let cityname = response[0].name;;
         
            let lat = response[0].lat;
            let lon = response[0].lon;
             
            var weatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=metric";

            $.ajax({
                url: weatherURL,
                method: "GET"
            }).then(function(response) {
                 
                $("#nameofCity").text(city + ": " + response.list[0].dt_txt.substring(0, 10));
                $("#temperature").text("Temp.: " + response.list[0].main.temp + "C°");
                 
                let iconUrl = "https://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png";
                 
                $("#weather-icon").attr("src", iconUrl);
                $("#humidity").text("Humidity: " + response.list[0].main.humidity + "%");
                $("#wind").text("Wind: " + response.list[0].wind.speed + " mph");
                
                $("#forecast").empty();
               
                fivedaysforecast(response);

                // Add city to local storage
                let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
                console.log(searchHistory);
                searchHistory.unshift(cityname);
                searchHistory = searchHistory.slice(0, 6);
                localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
                
                // Append, remove existing buttons and add new ones to the list
                $("#city-list").html("");
                searchHistory.forEach(function(city) {
                let btn = $("<button>").text(city).addClass("city-btn");
                $("#city-list").append(btn);
            });
        });
    });
});
    //Displaying weather from history buttons on the left

    $("#city-list").on("click", ".city-btn", function(event) {
    event.preventDefault();
    let cityname = $(this).text();
    var queryURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityname + "&limit=1&appid=" + apiKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
             
            let lat = response[0].lat;
            let lon = response[0].lon;
            console.log(lat);
            console.log(lon);
            var weatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=metric";

            $.ajax({
                url: weatherURL,
                method: "GET"
            }).then(function(response) {
                 
                $("#nameofCity").text(cityname + ": " + response.list[0].dt_txt.substring(0, 10));
                $("#temperature").text("Temp.: " + response.list[0].main.temp + "C°");
                console.log(response.list[0].main.temp);
                let iconUrl = "https://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png";
                console.log(iconUrl);
                $("#weather-icon").attr("src", iconUrl);
                $("#humidity").text("Humidity: " + response.list[0].main.humidity + "%");
                $("#wind").text("Wind: " + response.list[0].wind.speed + " mph");
                

                $("#forecast").empty();
                fivedaysforecast(response);
            });
        });
    });
    