var express = require("express");
var router  = express.Router();

// Requiring our models
var db = require("../models");

//Get all burgers from the database.
router.get("/", function(req, res)
{
    var query = {};

    /*burger.allBurgers(function(data)
    {
        var hbsObject = { burgers: data };
        res.render("index", hbsObject);
    });*/

    db.Burger.findAll(
    {
        where: query
    })
    .then(function(data)
    {
        var hbsObject = { burgers: data };
        res.render("index", hbsObject);
    });
});
  
//Add new burger to database.
router.post("/api/burger", function(req, res)
{
    let burgerName = req.body.burgerName;
    burger.createBurger(burgerName, function(result)
    {
        //Send back the ID of the new burger.
        res.json({ id: result.insertId });
    });
});
  
//Update burger devoured status in database.
router.put("/api/burger/:id", function(req, res)
{
    var id = req.params.id;

    burger.updateDevouredID(id, true, function(result)
    {
        if (result.affectedRows === 0)
        {
            //If no rows were changed, then the ID must not exist, so 404.
            return res.status(404).end();
        }
        else
        {
            res.status(200).end();
        }
    });
});
  
//Remove burger from database.
router.delete("/api/burger/:id", function(req, res)
{
    var id = req.params.id;

    burger.deleteBurgerID(id, function(result)
    {
        if (result.affectedRows === 0)
        {
            //If no rows were changed, then the ID must not exist, so 404.
            return res.status(404).end();
        }
        else
        {
            res.status(200).end();
        }
    });
});
    
module.exports = router;