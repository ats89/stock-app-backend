module.exports = (sequelize, DataTypes) => {
  const Config = sequelize.define('Config', {
    name: {
      type: DataTypes.STRING,
    },
    value: {
      type: DataTypes.STRING,
    },
  });

  return Config;
};
