const mongodb = require('./mongo');
const sequelize = require('./sequelize');
const getModelUtil = require('./db.model');
const rawModels = require('../models');

const MODEL_NAMES = [
  'user'
];

module.exports = {
  async init({ alias, type }) {
    if (!type) {
      throw {
        err_desc: 'not specify db_type'
      };
    }
    for (const form of MODEL_NAMES) {
      await this.model({ form,  alias });
    }
  },
  model({ form, alias = 'default' }) {
    const rawModel = rawModels[form];
    if (rawModel.$model_type === 'mongo') {
      const connect = mongodb.getConnect({ alias });
      if (connect.models[form]) {
        return connect.models[form];
      } else {
        return connect.model(form, getModelUtil(rawModel));
      }
    } else if (rawModel.$model_type === 'sequelize') {
      const connect = sequelize.getConnect({ alias });
      if (connect.models[form]) {
        return connect.models[form];
      } else {
        return getModelUtil(rawModel, connect);
      }
    }

    throw 'unknown type of model';
  },
};
