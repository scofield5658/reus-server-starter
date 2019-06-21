module.exports = [
  {
    path: '/hello',
    method: 'get',
    controller: require('../controllers/hello'),
    middlewares: [require('../middlewares/hello.mid')],
  },
  {
    path: '/redirect_sample',
    method: 'get',
    redirect: '/v1/business/banners',
    target: 'http://172.50.1.182:3080',
  },
];
