const express = require("express");
const fs = require('fs');
const app = express();
let carList = [];

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.listen(3000, function () {
    console.log("server started at 3000");
    const rawData = fs.readFileSync(__dirname + "/public/data/data10.json");
    carList = JSON.parse(rawData);
    //console.log(carList);
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.post('/index', function (req, res) {
    const NewCar = {
        "stock_num": req.body.stock_num,
        "make": req.body.make,
        "model": req.body.model,
        "year": parseInt(req.body.year),
        "color": req.body.color,
        "url": req.body.url,
        "price": req.body.price
    };

    carList.push(NewCar);
    const carJSON = JSON.stringify(carList);
    console.log(carJSON);
    fs.writeFile(__dirname + "/public/data/data10.json", carJSON,
        function (err) {
            if (err) {
                console.log("JSON writing failed");
            } else {
                res.redirect('/');
            }
        });
});

app.post('/delete-num', (req, res) => {
    //req.body.name;
    //req.body.messgee
    carList = carList.filter((car) => {
        return car.stock_num !== req.body.stock_num;
        //return msg.name !== msg.body.name || msg.message !== req.body.message
    });
    const carJSON = JSON.stringify(carList);
    fs.writeFile(__dirname + "/public/data/data10.json", carJSON,
        function (err) {
            if (err) {
                console.log("File writing error");
                console.log(err);
            }
        });
    res.sendFile(__dirname + "/public/index.html");
});

let checked_list = [];

app.post('/checked_list', (req, res) => {
    const NewCar = {
        "stock_num": req.body.stock_num,
        "make": req.body.make,
        "model": req.body.model,
        "year": parseInt(req.body.year),
        "color": req.body.color,
        "url": req.body.url,
        "price": req.body.price
    };

    checked_list.push(NewCar);
    console.log(checked_list);
});

app.post('/unchecked_list', (req, res) => {
    const NewCar = {
        "stock_num": req.body.stock_num,
        "make": req.body.make,
        "model": req.body.model,
        "year": parseInt(req.body.year),
        "color": req.body.color,
        "url": req.body.url,
        "price": req.body.price
    };
    for(let i = 0; i < checked_list.length; i++) {
        if(NewCar.stock_num === checked_list[i].stock_num){
            checked_list.splice(i, 1);
        }
    }
    console.log(checked_list);
});

app.post('/delete-selected', (req, res) => {

    console.log(carList);
    console.log(checked_list);
    let carListLength = carList.length;
    let checkCarLength = checked_list.length;
    for(let i = 0; i < checkCarLength; i++){
        let current_car = checked_list[i];
        for(let j = 0; j < carListLength; j++){
            if(current_car.stock_num === carList[j].stock_num){
                carList.splice(i,1);
                j--;
                carListLength--;
            }
        }
        checked_list.splice(i, 1);
        i--;
        checkCarLength--;
    }


    const carJSON = JSON.stringify(carList);
    fs.writeFile(__dirname + "/public/data/data10.json", carJSON,
        function (err) {
            if (err) {
                console.log("File writing error");
                console.log(err);
            }
        });
    res.sendFile(__dirname + "/public/index.html");
});


