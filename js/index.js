$(document).ready(function(){
    var lat,lon;
    var degree;
    var tmpShow;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            console.log(lat+"  "+lon);

            var para = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=c1c694969d22d150c4fad70b654ddcda"

            console.log(para)

            $.getJSON(para,function(json){
                var city = json["name"];
                var cnty = json["sys"]["country"];
                var weatherNow = json["weather"][0]["main"];
                degree = (json["main"]["temp"] - 273.15).toFixed(2);
                tmpShow = degree;


                var windShow = "Wind speed: "+json["wind"]["speed"]+" km/h";
                $("#cityname").html(city+", "+cnty);
                $('.weather').html(weatherNow);
                $(".tmp").html(tmpShow);
                $(".wind").html(windShow);
            });
        });
    }

    $(".btn-tmp-change").on("click",function(){
        console.log($(".tmp").html());
        if(degree == $(".tmp").html()){
            $(".tmp").html((degree*1.8+32).toFixed(2));
            $(".tmp-kind").html("°F");
            console.log(degree);
            console.log($(".tmp").html());
        }else{
            $(".tmp").html(degree);
            $(".tmp-kind").html("°C");
        }
    });

});