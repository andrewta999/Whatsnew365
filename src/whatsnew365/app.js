import express from 'express'
import { createServer } from "http"
import { Server } from "socket.io"

// initialize an express instance, 
// a http instance for socket.io, 
// and an io instance that allows cors
const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*',
    }
})

// "connection" event handler
io.on("connection", (socket) => {
    socket.emit("connected", "You are connected. Hooray!!!")
})

export { app, server, io } 