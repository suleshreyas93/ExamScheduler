let express = require("express");
let router = express.Router();

//Get Home Page
router.get("/",function(req,res){
    res.render("login");
});

module.exports = router;