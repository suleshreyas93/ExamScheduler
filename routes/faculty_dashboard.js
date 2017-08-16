let express = require("express");
let router = express.Router();


router.get("/",function(req,res){
    res.render("faculty_dashboard");
});

router.post("/",function(req,res){

    req.checkBody("unm","Username is required");
    req.checkBody("pwd","Password is required");

    let errors = req.validationErrors();

    if(errors)
    {
        res.render("login",{
            errors : errors
        })
    }
    else
    {
        res.render("faculty_dashboard");
    }
});


module.exports = router;