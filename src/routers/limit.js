module.exports = [
  {
    path: "/limit",
    method: "get",
    controller: require("../controllers/limit"),
    speed_limit: {
      type: "memory",
      max: 2,
      duration: 5, // seconds
      errmsg: "自定义限速提示",
      validate(ctx) {
        return ctx.ip;
      },
    },
  },
];
