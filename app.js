const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const path = require("path");
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.use(express.static("public"));
// Setting path for public directory 
const static_path = path.join(__dirname, "public");
app.use(express.static(static_path));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
var temp = "";
var humidity = "";
var pressure = "";
var speed = "";
var desc = "";
var city = "";
var state1 = "";
var visi = "";
var temp_min = "";
var temp_max = "";
var sunrise = "";
var sunset = "";
var co = "";
var no2 = "";
var ozone = "";
var pm10 = "";
var pm25 = "";
var so2 = "";
var city2 = "";
var place_name = "";
var aqi = "";
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const d = new Date();
let day = weekday[d.getDay()];
const monthh = month[d.getMonth()];
app.get("/", function (req, res) {
    res.render("index", {
        temp: temp, humidity: humidity, pressure: pressure, speed: speed, day: day, date: d.getDate(), year: d.getFullYear(),
        month: monthh, desc: desc, state: state1, city: city, visi: visi,
        temp_max: temp_max, temp_min: temp_min, temp_max: temp_max, sunrise: sunrise, sunset: sunset,
        aqi: aqi, placename: place_name, co: co, no2: no2, ozone: ozone, pm10: pm10, pm25: pm25, so2: so2
    });
});

app.post("/request", (req, res) => {
    console.log(req.body);

    const val = " https://api.ambeedata.com/latest/by-lat-lng?lat=" + req.body.latitude + "&lng=" + req.body.longitude;
    var option3 = {
        url: val,
        headers: { 'x-api-key': '518264e3fdc2f7588f5c6b5496faed0148bf54698743c2f8c52b39511e13cc20', 'Content-type': 'application/json' }
    }
    request(option3, function (err, response, body) {
        if (err) console.log(err);
        else {
            console.log(body);
            var poll = JSON.parse(body)
            console.log(poll);
            co = poll.stations[0].CO;
            console.log(co);
            no2 = poll.stations[0].NO2;
            ozone = poll.stations[0].OZONE;
            pm10 = poll.stations[0].PM10;
            pm25 = poll.stations[0].PM25;
            so2 = poll.stations[0].SO2;
            city2 = poll.stations[0].city;
            place_name = poll.stations[0].placeName;
            aqi = poll.stations[0].AQI;
            state1 = poll.stations[0].state;

        }
    })
    const uri = "https://api.openweathermap.org/data/2.5/weather?lat=" + req.body.latitude + "&lon=" + req.body.longitude + "&appid=8bb03e1983c6d43761b3f2633bb5b8b6";
    var option2 = {

        url: uri
    }

    request(option2, function (err, response, body) {
        if (err) console.log(err);
        else {
            console.log(body);
            var p = JSON.parse(body);
            console.log(p);
            temp = p.main.temp;
            temp = parseInt(temp);
            console.log(temp);
            temp = temp - 273.15;
            temp = temp.toString();
            temp = temp.substring(0, 4);
            desc = p.weather[0].description;
            humidity = p.main.humidity;
            pressure = p.main.pressure;
            speed = p.wind.speed;
            temp_min = p.main.temp_min;
            temp_min = parseInt(temp_min);
            temp_min = temp_min - 273.15;
            temp_min = temp_min.toString();
            temp_min = temp_min.substring(0, 4);

            temp_max = p.main.temp_max;
            temp_max = parseInt(temp_max);
            temp_max = temp_max - 273.15;
            temp_max = temp_max.toString();
            temp_max = temp_max.substring(0, 4);
            sunrise = p.sys.sunset;
            visi = p.visibility;
            var timestamp = (p.sys.sunrise);
            var times = (parseInt(timestamp)) * 1000;

            var date = new Date(times);
            date = date.toLocaleString()
            date = date.substring(10);
            sunrise = date;
            var date2 = new Date((p.sys.sunset) * 1000);
            date2 = date2.toLocaleString()
            date2 = date2.substring(10);
            sunset = date2;

            city = p.name;
            res.redirect("/");
            //  res.redirect(req.get('referer'));
            // res.send(body);
        }
    });


});
app.post("/", function (req, res) {
    console.log(req.body);
    city = req.body.city;
    var state = req.body.state;
    if (city === "") { res.redirect("/"); }
    else { 
    console.log(city);
    console.log(state);
    if (state === "Andhra Pradesh") { state = "AD"; }
    else if (state === "Assam") { state = "AS"; }
    else if (state === "Bihar") { state = "BR"; }
    else if (state === "Chattisgarh") { state = "CG"; }
    else if (state === "Delhi") { state = "DL"; }
    else if (state === "Goa") { state = "GA"; }
    else if (state === "Gujarat") { state = "GJ"; }
    else if (state === "Haryana") { state = "HR"; }
    else if (state === "Himachal Pradesh") { state = "HP"; }
    else if (state === "Jammu and Kashmir") { state = "JK"; }
    else if (state === "Jharkhand") { state = "JH"; }
    else if (state === "Karnataka") { state = "KA"; }
    else if (state === "Kerala") { state = "KL"; }
    else if (state === "Lakshadweep Islands") { state = "LD"; }
    else if (state === "Madhya Pradesh") { state = "MP"; }
    else if (state === "Maharashtra") { state = "MH"; }
    else if (state === "Manipur") { state = "MN"; }
    else if (state === "Meghalaya") { state = "ML"; }
    else if (state === "Mizoram") { state = "MZ"; }
    else if (state === "Nagaland") { state = "NL"; }
    else if (state === "Odisha") { state = "OD"; }
    else if (state === "Pondicherry") { state = "PY"; }
    else if (state === "Punjab") { state = "PB"; }
    else if (state === "Rajasthan") { state = "RJ"; }
    else if (state === "Sikkim") { state = "SK"; }
    else if (state === "Tamil Nadu") { state = "TN"; }
    else if (state === "Telangana") { state = "TS"; }
    else if (state === "Tripura") { state = "TR"; }
    else if (state === "Uttar Pradesh") { state = "UP"; }
    else if (state === "Uttarakhand") { state = "UK"; }
    else if (state === "West Bengal") { state = "WB"; }
    else if (state === "Andaman and Nicobar Islands") { state = "AN"; }
    else if (state === "Chandigarh") { state = "CH"; }
    else if (state === "Dadra & Nagar Haveli and Daman & Diu") { state = "DNHDD"; }
    else if (state === "Ladakh") { state = "LA"; }
    else { state = "OT"; }
    console.log(state);
    const uri = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + state + ",IND&limit=&appid="+'8bb03e1983c6d43761b3f2633bb5b8b6';

    var options = {
        url: uri
    }

    request(options, function (err, response, body) {
        if (err) {
            console.log(err);
        }
        else {

            console.log(body);

            const r = JSON.parse(body);



            if (r.length === 0) { res.redirect("/"); }

            else {
                const val = " https://api.ambeedata.com/latest/by-lat-lng?lat=" + r[0].lat + "&lng=" + r[0].lon;
                var option3 = {
                    url: val,
                    headers: { 'x-api-key': '518264e3fdc2f7588f5c6b5496faed0148bf54698743c2f8c52b39511e13cc20', 'Content-type': 'application/json' }
                }
                request(option3, function (err, response, body) {
                    if (err) console.log(err);
                    else {
                        console.log(body);
                        var poll = JSON.parse(body)
                        console.log(poll);
                        co = poll.stations[0].CO;
                        console.log(co);
                        no2 = poll.stations[0].NO2;
                        ozone = poll.stations[0].OZONE;
                        pm10 = poll.stations[0].PM10;
                        pm25 = poll.stations[0].PM25;
                        so2 = poll.stations[0].SO2;
                        city2 = poll.stations[0].city;
                        place_name = poll.stations[0].placeName;
                        aqi = poll.stations[0].AQI;
                    }
                })
                const uri = "https://api.openweathermap.org/data/2.5/weather?lat=" + r[0].lat + "&lon=" + r[0].lon + "&appid="+'8bb03e1983c6d43761b3f2633bb5b8b6';
                var option2 = {

                    url: uri
                }

                request(option2, function (err, response, body) {
                    if (err) console.log(err);
                    else {
                        console.log(body);
                        var p = JSON.parse(body);
                        console.log(p);
                        temp = p.main.temp;
                        temp = parseInt(temp);
                        console.log(temp);
                        temp = temp - 273.15;
                        temp = temp.toString();
                        temp = temp.substring(0, 4);
                         

                            desc = p.weather[0].description;
                       
                        humidity = p.main.humidity;
                        pressure = p.main.pressure;
                        speed = p.wind.speed;
                        temp_min = p.main.temp_min;
                        temp_min = parseInt(temp_min);
                        temp_min = temp_min - 273.15;
                        temp_min = temp_min.toString();
                        temp_min = temp_min.substring(0, 4);

                        temp_max = p.main.temp_max;
                        temp_max = parseInt(temp_max);
                        temp_max = temp_max - 273.15;
                        temp_max = temp_max.toString();
                        temp_max = temp_max.substring(0, 4);
                        sunrise = p.sys.sunset;
                        visi = p.visibility;
                        var timestamp = (p.sys.sunrise);
                        var times = (parseInt(timestamp)) * 1000;

                        var date = new Date(times);
                        date = date.toLocaleString()
                        date = date.substring(10);
                        sunrise = date;
                        var date2 = new Date((p.sys.sunset) * 1000);
                        date2 = date2.toLocaleString()
                        date2 = date2.substring(10);
                        sunset = date2;
                        state1 = p.name;
                        res.redirect("/");
                    }
                })
            }
        }

    });
};
});

app.listen(port, function () {
    console.log("Server is running on port " + port);
});