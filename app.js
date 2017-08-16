let express = require("express");
let bodyParser = require("body-parser");
let exhbs = require("express-handlebars");
let session = require("express-session");
let flash = require("connect-flash");
let path = require("path");
let expressValidator = require("express-validator");
//Init app
let app = express();

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

//View Engine
app.set("views",path.join(__dirname,"views"));
app.engine("handlebars",exhbs({defaultLayout : "main"}));
app.set("view engine","handlebars");

//Static Folder
const static = express.static(__dirname + "/public");
app.use("/public",static);

//Express session
app.use(session({
    secret : "secret",
    saveUninitialized : true,
    resave : true
}));

//Connect flash
app.use(flash());

//Global Variables
app.use(function(req,res,next){
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
});

//Express validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));



//Configure Routes
let configureRoutes = require("./routes");
configureRoutes(app);

app.listen(3000,function(){
    console.log("Server running on port 3000...");
});