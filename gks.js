require('dotenv').config()
const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");

const app = express();
app.set("view engine" , "ejs");
app.use(bodyparser.urlencoded({extended: true}));

const u = process.env.API_MAPBOXKEY;
app.get("/gks.css",function(req,res)
{
    res.sendFile(__dirname+"/gks.css");
});

app.get("/",function(req,res)
{
    res.render("index",{
        k : u
    });
});

const key = process.env.API_KEY;
app.post("/",function(req,res)
{
    var a = req.body.userinput;
    request("https://api.openweathermap.org/data/2.5/weather?q="+a+"&appid="+key+"&units=metric",function(error,response,body)
    {
       var data = JSON.parse(body);
       var b = data.main.temp;
       var c = data.main.humidity;
       var d = data.weather[0].description;
       var e = data.weather[0].icon;
       var f = (parseInt)(data.wind.speed*(3.6));
       var g = data.coord.lon;
       var h = data.coord.lat;
       var i = process.env.API_MAPBOXKEY;
       var li = "http://openweathermap.org/img/w/"+e+".png"
       res.render("list",{p: a, q: b, r: c, s: d, t: li,o: f,lng : g,lat : h,key : i})
    });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port,function()
{
    console.log("server started...");
});