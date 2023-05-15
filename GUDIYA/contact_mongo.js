const express = require("express")
const app = express()
const mongoose = require("mongoose")
const UserModel = require("./models/user.model")

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true })

const mongodb = "mongodb://127.0.0.1:27017/GUDIYA"

mongoose.connect(mongodb, { useNewUrlParser : true}, { useUnifiedTopology : true}).then(() => { console.log("MongoDB connected") }).catch((err) => console.log("mongo err", err));
var db=mongoose.connection;

var server = app.listen(2000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})


app.get('/usercrud', function (req, res) {
    
    res.sendFile(__dirname + "/" + "demo2.html");
})


app.post('/contact', urlencodedParser, async function (req, res) {
    // console.log(req.body.name);
    // console.log(req.body.email);
    // console.log(req.body.mobile);


    // var reply="";
    // reply+="THe name is : "+req.body.fname+" "+req.body.lname+"<br>";
    // reply+="THe email is : "+req.body.email+"<br>";
    // reply+="THe message is : "+req.body.message+"<br>";
    // reply+="additional : "+req.body.additional+"<br>";


    const result=new UserModel({
        username: req.body.username,
        password:req.body.password
    });

    await result.save();

    // db.collection('users').insertOne(result,(err,collection)=>{
    //     if(err){
    //         throw err;
    //     }
    //     console.log("Record inserted succesfully");
    // });


    // res.send(reply+"<br>INFORMATION SAVED SUCCESFULLY IN OUR MONGO DATABASE<br>")

})