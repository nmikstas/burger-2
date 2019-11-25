module.exports = function(sequelize, DataTypes)
{
    let Burger = sequelize.define("Burger",
    {
        burger_name:
        {
            type: DataTypes.STRING,
            allowNull: false,
            validate:
            {
                len: [1]
            }
        },
        devoured:
        {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });

    Burger.associate = function(models)
    {
        Burger.belongsTo(models.User,
        {
            foreignKey:
            {
                allowNull: false
            }
        });
    };
  
    return Burger;
};


