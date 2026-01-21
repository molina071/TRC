function applyAssociations(sequelize) {
  const { colaboradores, rol, sucursales, transportistas, usuarios, viajes, colaborador_sucursal} = sequelize.models;

  // Un rol tiene muchos usuarios
  rol.hasMany(usuarios, { foreignKey: "rl_id" });
  usuarios.belongsTo(rol, { foreignKey: "rl_id" });

  // Un usuario hace muchos viajes
  usuarios.hasMany(viajes, { foreignKey: "us_id" });
  viajes.belongsTo(usuarios, { foreignKey: "us_id" });

  // Una sucursal aparece en muchos viajes
  sucursales.hasMany(viajes, { foreignKey: "sc_id" });
  viajes.belongsTo(sucursales, { foreignKey: "sc_id" });

  // Una colaborador aparece en muchos viajes
  colaboradores.hasMany(viajes, { foreignKey: "cl_id" });
  viajes.belongsTo(colaboradores, { foreignKey: "cl_id" });

  // Una colaborador aparece en muchos viajes
  transportistas.hasMany(viajes, { foreignKey: "tr_id" });
  viajes.belongsTo(transportistas, { foreignKey: "tr_id" });

  // Relación N:M
  colaboradores.belongsToMany(sucursales, {
    through: colaborador_sucursal,
    foreignKey: 'cl_id',
    otherKey: 'sc_id',
  });

  sucursales.belongsToMany(colaboradores, {
    through: colaborador_sucursal,
    foreignKey: 'sc_id',
    otherKey: 'cl_id',
  });

};

module.exports = { applyAssociations };
