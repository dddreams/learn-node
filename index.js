var server = require('./server');
var router = require('./router/router');
var requestHandlers = require('./controller/requestHandlers');

var handle = {};
handle["/"] = requestHandlers.start;
handle["/login"] = requestHandlers.login;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
// GIT 请求
handle["/setting"] = requestHandlers.setting;

server.start(router.route, handle);