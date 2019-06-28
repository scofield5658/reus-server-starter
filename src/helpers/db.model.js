const Sequelize = require('sequelize');
const mongoose = require('mongoose');

const getMongoModel = (rawModel) => {
  const Schema = mongoose.Schema;
  const wrappedModel = {};
  const keys = Object.keys(rawModel);
  for (const key of keys) {
    if (key.startsWith('$')) {
      continue;
    }

    let type;
    let isIndex = false;

    if (typeof rawModel[key] === 'object') {
      type = rawModel[key].type;
      isIndex = rawModel[key].index;
    } else {
      type = rawModel[key];
    }

    if (new type() instanceof String) {
      wrappedModel[key] = {
        type: String,
        index: Boolean(isIndex),
      };
    } else if (new type() instanceof Number) {
      wrappedModel[key] = {
        type: Number,
        index: Boolean(isIndex),
      };
    } else if (new type() instanceof Date) {
      wrappedModel[key] = {
        type: Date,
      };
    } else if (new type() instanceof Boolean) {
      wrappedModel[key] = {
        type: Boolean,
      };
    } else if (new type() instanceof Array) {
      wrappedModel[key] = {
        type: Array,
      };
    } else if (new type() instanceof Object) {
      wrappedModel[key] = {
        type: Object,
      };
    }
  }

  return new Schema(wrappedModel, { strict: false });
};

const getSequelizeModel = (rawModel, sequelize) => {
  const Schema = Sequelize.Model;
  const wrappedModel = {};
  const indexes = [];
  const keys = Object.keys(rawModel);
  if (!rawModel.$model_name || typeof rawModel.$model_name !== 'string') {
    throw '$model_name not spcified';
  }
  for (const key of keys) {
    if (key.startsWith('$model_name')) {
      continue;
    }

    let type;

    if (typeof rawModel[key] === 'object') {
      type = rawModel[key].type;
      isIndex = rawModel[key].index;
    } else {
      type = rawModel[key];
    }

    if (new type() instanceof String) {
      wrappedModel[key] = {
        type: Sequelize.STRING,
      };
      indexes.push({
        unique: true,
        fields: [key]
      });
    } else if (new type() instanceof Number) {
      wrappedModel[key] = {
        type: Sequelize.NUMBER,
      };
      indexes.push({
        unique: true,
        fields: [key]
      });
    } else if (new type() instanceof Date) {
      wrappedModel[key] = {
        type: Sequelize.DATE,
      };
    } else if (new type() instanceof Boolean) {
      wrappedModel[key] = {
        type: Sequelize.BOOLEAN,
      };
    } else if (new type() instanceof Array) {
      wrappedModel[key] = {
        type: Sequelize.ARRAY,
      };
    } else if (new type() instanceof Object) {
      wrappedModel[key] = {
        type: Sequelize.STRING,
      };
    }
  }

  class SeqModel extends Schema {}
  SeqModel.init(wrappedModel, { sequelize, modelName: rawModel.$model_name, indexes });
  return SeqModel;
};

module.exports = (rawModel, sequelize) => {
  if (!rawModel.$model_type || typeof rawModel.$model_type !== 'string') {
    throw '$model_type not spcified';
  }
  switch (rawModel.$model_type) {
  case 'mongo':
    return getMongoModel(rawModel);
  case 'sequelize':
    return getSequelizeModel(rawModel, sequelize);
  default:
    throw 'unknown type of model';
  }
};
