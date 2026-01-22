// models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL);

// Importar modelos
require("./colaboradoresModel")(sequelize, DataTypes);
require("./sucursalesModel")(sequelize, DataTypes);
require("./transportistasModel")(sequelize, DataTypes);
require("./userModel")(sequelize, DataTypes);
require("./viajesModel")(sequelize, DataTypes);
require("./rolModel")(sequelize, DataTypes);
require("./suc_col_Model")(sequelize, DataTypes);

const { applyAssociations } = require("./relaciones");
applyAssociations(sequelize);

// Exportar sequelize y modelos
module.exports = {
    sequelize,
  ...sequelize.models,
};

