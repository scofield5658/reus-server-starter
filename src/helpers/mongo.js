const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

const connects = {};

module.exports = {
  async connect({ alias = 'default', uri, user, password, poolSize, replset }) {
    connects[alias] = await mongoose.createConnection(uri, {
      user,
      pass: password,
      poolSize,
      replset,
      useNewUrlParser: true
    });
  },
  async disconnect() {
    await mongoose.disconnect();
  },
  getConnect({alias = 'default'}) {
    return connects[alias];
  },
};
