module.exports = {
  $model_name: 'user',
  $model_type: 'mongo',
  id: { type: String, index: true },
  name: String,
  age: Number,
  birth: { type: Date },
};
