const express = require("express");
const bcrypt = require('bcryptjs');
const session = require("express-session");
const path = require('path');
// const fs = require('fs');

const mongoose = require("mongoose");
const MongoDBSession = require('connect-mongodb-session')(session);
const mongouri = "mongodb://127.0.0.1:27017/sessions";
const app = express();


const UserModel = require('./models/user');
const { render } = require("ejs");

app.use(express.static(__dirname + '/Images'));


mongoose
    .connect(mongouri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    .then((res) => {
        console.log("MonogoDB connected");
    });


const store = new MongoDBSession({
    uri: mongouri,
    collection: "mySessions"
});


// app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const isAuth = (req,res,next)=>
{
    if(req.session.isAuth){
        next();
    }                                                                                                                                                                                                       
    else{
        res.redirect('/login');
    }
}

app.use(
    session({
        secret: "For the Webtech DA",
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);

// for the main page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/views/" + "front_mail.html"))

});

// for the  login page
app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/views/" + "login.html")

});

// logic for authentication in login
app.post("/login", async (req, res) => {

    console.log('entered the post method of the login page');
    const { username,email, password } = req.body;

    const user = await UserModel.findOne({ username });
    if (!user) {
        return res.redirect("/login");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.redirect("/login");
    }

    // SETS A SESSION FOR IS AUTHENTICATED AS TRUE
    req.session.isAuth = true;
    res.redirect("/eng");

});

// for the sign up process
app.get("/sign_up", (req, res) => {
    res.sendFile(__dirname + "/views/" + "sign_up.html")

});
// for the signup logic
app.post("/sign_up", async (req, res) => {
    const { firstname,lastname,mobileno,address,country,city,state,zipcode,email,username,password,repassword } = req.body;
    console.log("entered the post of sigup")
    console.log(firstname);
    let user = await UserModel.findOne({ username });

    if (user) {
        return res.redirect('/sign_up');
    }
    
        const hashedPsw = await bcrypt.hash(password, 12);

        user = new UserModel({
            firstname,
            lastname,
            mobileno,
            address,
            country,
            city,
            state,
            zipcode,
            email,
            username,
            password: hashedPsw,
        });
    
    
   
    await user.save();
    res.redirect("/login");

});

app.get('/eng', isAuth, (req, res) => {

    res.sendFile(__dirname + "/views/" + "eng.html")
});

app.get('/logout', (req,res)=>
{
    req.session.destroy((err)=>
    {
        if(err) throw err;
        res.redirect('/')
    })
})

app.listen(5000);