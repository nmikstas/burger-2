var db = require("../models");

module.exports = function(app)
{
    //Get a list of current burgers.
    app.get("/api/burger", function(req, res)
    {
        db.Burger.findAll(
        {
            //Leave empty to get everything.
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
    app.post("/api/burger", function(req, res)
    {
        db.Burger.create(
        {
            burger_name: req.body.burgerName,
            devoured: false
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
    app.put("/api/burger/:id", function(req, res)
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
    app.delete("/api/burger/:id", function(req, res)
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
};
