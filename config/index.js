module.exports = {
  mongodb: [
    {
      alias: 'mongo1',
      uri: 'mongodb://export.com:27017/dbname',
      user: 'user',
      password: 'pass',
      poolSize: 2,
    },
  ],
  sequelize: [
    {
      alias: 'seq1',
      uri: 'postgres://user:pass@example.com:5432/dbname',
    },
  ],
};
