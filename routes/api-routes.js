// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app)
{
    //Get a list of current burgers.
    app.get("/api/burger", isAuthenticated, function(req, res)
    {
        db.Burger.findAll(
        {
            where:
            {
                UserId: req.user.id
            }
        })
        .then(function(dbBurger)
        {
            res.json(dbBurger);
        })
        .catch(function(error)
        {
            throw error;
        });
    });

    //Add a new burger.
    app.post("/api/burger", isAuthenticated, function(req, res)
    {
        db.Burger.create(
        {
            burger_name: req.body.burgerName,
            devoured: false,
            UserId: req.user.id
        })
        .then(function(result)
        {
            //Send back the ID of the new burger.
            res.json({ id: result.insertId });
        })
        .catch(function(error)
        {
            throw error;
        });
    });

    //Update burger devoured = true.
    app.put("/api/burger/:id", isAuthenticated, function(req, res)
    {
        db.Burger.update(
        {
            devoured: true
        },
        {
            where:
            {
                id: req.params.id
            }
        })
        .then(function(dbBurger)
        {
            res.json(dbBurger);
        })
        .catch(function(error)
        {
            throw error;
        });
    });

    //Delete a burger.
    app.delete("/api/burger/:id", isAuthenticated, function(req, res)
    {
        db.Burger.destroy(
        {
            where:
            {
                id: req.params.id
            }
        })
        .then(function(dbBurger)
        {
            res.json(dbBurger);
        })
        .catch(function(error)
        {
            throw error;
        });
    });
    
    //Using the passport.authenticate middleware with our local strategy.
    //If the user has valid login credentials, send them to the members page.
    //Otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), 
    function(req, res)
    {
        res.json(req.user);
    });

    //Route for signing up a user. The user's password is automatically hashed and
    //stored securely thanks to how we configured our Sequelize User Model. If the
    //user is created successfully, proceed to log the user in, otherwise send back
    //an error.
    app.post("/api/signup", function(req, res)
    {
        db.User.create(
        {
            username: req.body.username,
            email:    req.body.email,
            password: req.body.password
        })
        .then(function()
        {
            res.redirect(307, "/api/login");
        })
        .catch(function(err)
        {
            res.status(401).json(err);
        });
    });

    //Route for logging user out
    app.get("/logout", function(req, res)
    {
        req.logout();
        res.redirect("/");
    });

    //Route for getting some data about our user to be used client side
    app.get("/api/user_data", function(req, res)
    {
        if (!req.user)
        {
            //The user is not logged in, send back an empty object
            res.json({});
        } 
        else
        {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json(
            {
                username: req.user.username,
                email: req.user.email,
                id: req.user.id
            });
        }     
    });
};
