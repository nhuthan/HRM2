const { createProxyMiddleware, fixRequestBody } = require('http-proxy-middleware');
const { env } = require('process');
//var bodyParser = require('body-parser')

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:11266';

const context = [
    "/admin",
    "/account",
    "/api"
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: target,
        secure: false,
        headers: {
            Connection: 'Keep-Alive'
        },
        onProxyReq: fixRequestBody
    });

    // app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded());
    app.use(appProxy);
};
