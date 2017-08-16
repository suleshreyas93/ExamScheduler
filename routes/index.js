let loginRoutes = require("./login");
let dashboardRoutes = require("./faculty_dashboard");

let constructorMethod = function(app){
    app.use("/",loginRoutes);
    app.use("/faculty_dashboard",dashboardRoutes);
}

module.exports = constructorMethod;