const Sequelize = require('sequelize');

const connects = {};

module.exports = {
  async connect({ alias = 'default', uri }) {
    connects[alias] = new Sequelize(uri);
  },
  async disconnect({ alias = 'default' }) {
    await connects[alias].close();
  },
  getConnect({ alias = 'default' }) {
    return connects[alias];
  },
};
