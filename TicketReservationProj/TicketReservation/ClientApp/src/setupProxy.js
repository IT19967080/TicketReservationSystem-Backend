const { createProxyMiddleware } = require("http-proxy-middleware");
const { env } = require("process");

const target = env.ASPNETCORE_HTTPS_PORT
  ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
  : env.ASPNETCORE_URLS
  ? env.ASPNETCORE_URLS.split(";")[0]
  : "http://localhost:7892";

const context = [
  "/weatherforecast",
  "/api/train",
  "api/train",
  "/api/travelers",
  "api/travelers",
  "/api/travelers/login",
  "api/travelers/login",
  "/api/travelers/activate",
  "api/travelers/activate",
  "/api/travelers/deactivate",
  "api/travelers/deactivate",
  "api/traindata",
  "/api/traindata",
  "/api/ticket",
  "api/ticket",
];

module.exports = function (app) {
  const appProxy = createProxyMiddleware(context, {
    proxyTimeout: 10000,
    target: target,
    secure: false,
    changeOrigin: true,
    headers: {
      Connection: "Keep-Alive",
    },
  });

  app.use(appProxy);
};
