const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define(
        "activity",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            name:{
                type: DataTypes.STRING,
                allowNull: false
            },
            difficulty: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            duration: {
                type: DataTypes.INTEGER
            },
            season: {
                type: DataTypes.ENUM("summer", "fall", "winter", "spring"),
                allowNull: false
            }
        },
        { timestamps: false}
    );
};