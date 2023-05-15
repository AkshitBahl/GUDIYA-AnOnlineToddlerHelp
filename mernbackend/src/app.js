const express=require('express');
// const mongoose=require("mongoose");
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
const session = require("express-session");
// const session = require("express-session");
const path=require("path")
const app=express();
const hbs=require("hbs");


const port=process.env.PORT || 3000;



const registers=require("./models/registers");



const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");



app.use(express.json());
app.use(express.static(static_path));
app.use(express.urlencoded({extended:false}))
app.use(express.static(__dirname + '/Images'));
app.use(express.static(__dirname + '/json'));




app.set("view engine","hbs");
app.set("views",template_path);



hbs.registerPartials(partials_path);



var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true })


const mongodbSession = require('connect-mongodb-session')(session);
const mongouri = "mongodb://127.0.0.1:27017/sessions";

mongoose
    .connect(mongouri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    .then((res) => {
        console.log("MonogoDB connected");
});



// require("./db/conn");


const store = new mongodbSession({
    uri: mongouri,
    collection: "mySessions"
});


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
        secret: "WebTech Project",
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);




app.get("/",(req,res)=>{
    res.render("index")
}); 



app.get("/login",urlencodedParser, (req,res)=>{
    res.render("login");
})


app.get("/index", (req,res)=>{
    res.render("index");
})



// app.post("/login", async (req, res) => {

//     console.log('entered the post method of the login page');
//     const { username, password } = req.body;

//     const user = await UserModel.findOne({ username });
//     if (!user) {
//         return res.redirect("/login");
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//         return res.redirect("/login");
//     }

//     // SETS A SESSION FOR IS AUTHENTICATED AS TRUE
//     req.session.isAuth = true;
//     res.render("/index");

// });


app.post("/login",async (req,res)=>{
    try{
        const user=new registers({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            phnumber:req.body.phnumber,
            email:req.body.email,
            username:req.body.username,
            password:req.body.password,
            psame:req.body.psame,
            gender:req.body.gender,
        })

        await user.save();
        console.log("saved and proceeding");

        res.render("index");




    }catch(error){
        res.status(400).send(error)

    }

    req.session.isAuth = true;
    res.redirect("/index");
})




// app.get('/logout', (req,res)=>
// {
//     req.session.destroy((err)=>
//     {
//         if(err) throw err;
//         res.redirect('/')
//     })
// })




app.listen(port,()=>{
    console.log(`Server is runnig at port no. ${port}`);
});