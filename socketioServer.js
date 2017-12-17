var app = require("http").createServer()
var io = require("socket.io")(app)

var PORT = 8001

var clientCount = 0

app.listen(PORT)
io.on('connection',function (socket) {
	clientCount++
	socket.nickname = '用户' + clientCount

	io.emit('enter',"------" + socket.nickname + '已上线'+ "------")

	socket.on('message',function (str) {
		io.emit('message',socket.nickname + " : " + str)
	})
	socket.on('disconnect',function () {
		io.emit('leave',"------" + socket.nickname + '已下线'+ "------")
	})
})


console.log('websocket server listening on port ' + PORT)

