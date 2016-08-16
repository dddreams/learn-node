var url = require("url");

function route(handle, response, request){
	var pathName = url.parse(request.url).pathname;
	if(typeof handle[pathName] === 'function'){
		return handle[pathName](response, request);
	} else {
		response.writeHead(404, {"Content-Type": "text/plain"});
	    response.write("404 not found !");
	    response.end();
	}
}

exports.route = route;