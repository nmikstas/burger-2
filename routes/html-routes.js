// Dependencies
// =============================================================
let db = require("../models");

// Routes
// =============================================================
module.exports = function(app)
{
    app.get("/", function(req, res)
    {
        db.Burger.findAll(
        {
           //Leave empty to get everything.
        })
        .then(function(data)
        {
            let hbsObject = { burgers: data };
            res.render("index", hbsObject);
        });
       
    });
};
