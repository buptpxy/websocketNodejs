var ws = require("nodejs-websocket")

var PORT = 8001

var clientCount = 0
//Scream server example: "hi" -> "Hi!!!"
var server = ws.createServer(function (conn) {
	console.log("New connection")
	clientCount++
	conn.nickname = '用户' + clientCount
	var mes = {}
	mes.type = "in"
	mes.data = "------" + conn.nickname + '已上线'+ "------"
	broadcast(JSON.stringify(mes))
	conn.on("text",function (str) {
		console.log("Received " + str)
		mes.type = "text"
		mes.data = conn.nickname + " : " + str
		broadcast(JSON.stringify(mes))
	})
	conn.on("close",function (code,reason) {
		console.log('Connection closed')
		mes.type = "out"
		mes.data = "------" + conn.nickname + '已下线'+ "------"
		broadcast(JSON.stringify(mes))
	})
	conn.on("error",function (err) {
		console.log('handle err')
		console.log(err)
	})
}).listen(PORT)

console.log('websocket server listening on port ' + PORT)

function broadcast (str) {
	server.connections.forEach(function (connection) {
		connection.sendText(str)
	})
}