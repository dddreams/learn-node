var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");
var url = require("url");

function start (response, request){
	var login = "./views/login.html";
	fs.readFile(login, "binary", function(error, file){
		if(error){
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write(file, "binary");
			response.end();
		}
	});
}

//登录
function login(response, request){
	var params = "";
	request.setEncoding("utf8");
	request.addListener("data", function(postDataChunk){
        params += postDataChunk;
    });
    request.addListener("end", function(){
        response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("welcome "+querystring.parse(params).userName);
		response.end();
    });	
}

// 文件上传
function upload(response, request){
	var form = new formidable.IncomingForm();
	// fs.renameSync 方法无法跨磁盘移动文件，由于 windows 系统磁盘分区的原因，
	// 在 windows 系统下应该指定文件的目录和项目在同一磁盘下， linux 下无需指定
	form.uploadDir = "temp";
	form.parse(request, function(error, fields, files){
		try{
			fs.renameSync(files.upload.path, "./temp/test.png");
		}catch(e){
			console.log(e);
		}
		
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("<img src='/show'>");
		response.end();
	});
}

// 展示
function show(response, request){
	fs.readFile("./temp/test.png", "binary", function(error, file){
		if(error){
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "imagr/png"});
			response.write(file, "binary");
			response.end();
		}
	})
}

// 设置资料
function setting(response, request){	
	var params = url.parse(request.url, true).query;
	console.log(params);
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write(params.userName);
	response.end();
}

exports.start = start;
exports.login = login;
exports.upload = upload;
exports.show = show;
exports.setting = setting;