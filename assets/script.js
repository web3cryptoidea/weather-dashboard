 
var apiKey = "79ed2eddbec624b551c57e8e4cbb641f";

function fivedaysforecast(response) {
        
    for (var i=6; i<=response.list.length; i=i+7){
        console.log(response.list[i]);
        var card = $('<div>');
        card.addClass('card');

        var cityInfo = $(`<p>${response.city.name + ": " + response.list[i].dt_txt}</p>`);
        var tempInfo = $(`<p>${"Temperature: " + response.list[i].main.temp}</p>`); 
        var humInfo = $(`<p>${"Humidity: " + response.list[i].main.humidity}</p>`);
        var windInfo = $(`<p>${"Wind: " + response.list[i].wind.speed}</p>`);
        
        card.append(cityInfo);
        card.append(tempInfo);
        card.append(humInfo);
        card.append(windInfo);
        $('#forecast').append(card);
        
    }
}
// $(document).ready(function() {
     
    $("#search-button").click(function(event) {
        event.preventDefault();
        let city = $("#search-input").val().trim();
        var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey;


        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            
            let cityname = response[0].name;
        
            let lat = response[0].lat;
            let lon = response[0].lon;
            console.log(lat);
            console.log(lon);
            var weatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=metric";

            $.ajax({
                url: weatherURL,
                method: "GET"
            }).then(function(response) {
                 
                $("#nameofCity").text(response.city.name + ": " + response.list[0].dt_txt);
                $("#temperature").text("Temperature: " + response.list[0].main.temp);
                console.log(response.list[0].main.temp);
                $("#humidity").text("Humidity: " + response.list[0].main.humidity);
                $("#wind").text("Wind: " + response.list[0].wind.speed + " m/s");
                
                fivedaysforecast(response);
            });
        });
    });

    
        const cityButtons = document.querySelectorAll(".city-button");
        cityButtons.forEach(button => {
          button.addEventListener("click", () => {
            let city = button.textContent;
        
            var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey;
    
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                let cityname = response[0].name;
                let lat = response[0].lat;
                let lon = response[0].lon;
            
                var weatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=metric";
                $.ajax({
                    url: weatherURL,
                    method: "GET"
                }).then(function(response) {
                    console.log(weatherURL);
                    console.log(response);
                    $("#nameofCity").text(response.city.name + ": " + response.list[0].dt_txt);
                    $("#temperature").text("Temperature: " + response.list[0].main.temp);
                    console.log(response.list[0].main.temp);
                    $("#humidity").text("Humidity: " + response.list[0].main.humidity);
                    $("#wind").text("Wind: " + response.list[0].wind.speed + " m/s");
                });
            });
        });
       
    });
 
 