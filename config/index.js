module.exports = {
  mongodb: [
    {
      alias: 'mongo1',
      uri: 'mongodb://172.50.1.179:27017/ri-business-dev',
      user: 'ri-business-dev',
      password: 'abcd@1234',
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
