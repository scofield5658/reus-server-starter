module.exports = [
  {
    path: "/hello",
    method: "get",
    controller: require("../controllers/hello"),
    middlewares: [require("../middlewares/hello.mid")],
  },
  {
    path: "/redirect_sample",
    method: "get",
    proxyPattern: "/redirect_sample",
    pathRewrite: (path) => {
      console.log(path);
      return "/v3/weather/weatherInfo?key=162150bdfd5e3e12a2d882272232318b&city=%E5%B9%BF%E5%B7%9E&output=json"
    },
    target: "http://restapi.amap.com",
  },
];
