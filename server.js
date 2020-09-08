const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)
const socket = require("socket.io")
const io = socket(server)
let users = []
let deserter = []

io.on("connection", client => {

    let name = ""
    client.emit("your id", client.id)
    client.on("send message", body => {
        io.emit("message", body)
    })

    client.on("hasName", data => {
        users.push(data)
        name = data
        client.broadcast.emit("welcome", users)
    })

    client.on("disconnect", () => {
        console.log("tous", users)
        users = users.filter(function (user) {
            if (user == name) {
                deserter.push(name)
                return false
            }
            return true
        })
        client.broadcast.emit("ciao", deserter)
        console.log(deserter)
    })
})

server.listen(8000, () => console.log("Server is running on port 8000"))