// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
let db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app)
{
    app.get("/", function(req, res)
    {
        res.redirect("/burger");
    });

    app.get("/burger", function(req, res)
    {
        // If the user already has an account send them to the members page
        if (req.user)
        {
            db.Burger.findAll(
            {
                where:
                {
                    UserId: req.user.id
                }
            })
            .then(function(data)
            {
                let hbsObject = { burgers: data, user: req.user.username };
                res.render("index", hbsObject);
            });
        }
        else
        {
            res.redirect("login");
        }
    });

    app.get("/login", function(req, res)
    {
        // If the user already has an account send them to the members page
        if (req.user)
        {
            res.render("index");
        }
        else
        {
            res.render("login");
        }
    });

    app.get("/signup", function(req, res)
    {
        // If the user already has an account send them to the members page
        if (req.user)
        {
            res.render("index");
        }
        else
        {
            res.render("signup");
        }
    });

    //Here we've add our isAuthenticated middleware to this route.
    //If a user who is not logged in tries to access this route they
    //will be redirected to the signup page
    app.get("/burger", isAuthenticated, function(req, res)
    {
        res.render("login");
    });
};
