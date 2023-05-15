const mongoose = require("mongoose");
const session = require("express-session");


// mongoose.connect("mongodb://127.0.0.1:27017/gudiya",{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(()=>{
//     console.log("connection to Database succesful");
// }).catch((e)=>{
//     console.log(`connection to database failed ${e}`);
// });


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


exports.module=mongodbSession;