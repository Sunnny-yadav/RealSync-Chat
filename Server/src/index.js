import app from "./app.js"
import { GetMongoDbConnnection } from "./db/index.js";
import { ErrorHandeller } from "./utils/ErrorHandeller.js";
import {Server} from 'socket.io'

const PORT = process.env.PORT; 
app.use(ErrorHandeller)

GetMongoDbConnnection()
.then((res)=>{

  const server = app.listen(PORT, () => {
    console.log("Server is intilized on port :: ", PORT);
  });

  //Initialize the socket.io with server
  const io = new Server(server,{
    pingTimeout:60000,
    cors:{
      origin:"http://localhost:5173"
    }
  });

  io.on("connection",(socket)=>{
    console.log("connection successfull with socket");

    socket.on("setUp",(userData)=>{
      socket.join(userData._id);
      console.log("user room created:",userData._id)
      socket.emit("connected");
    });

    socket.on("join room",(roomId)=>{
      socket.join(roomId);
      console.log("user joined the room:",roomId)
    });

    socket.on("typing",(roomId)=>{
        socket.in(roomId).emit("typing")
    });

    socket.on("stop typing",(roomId)=>{
      socket.in(roomId).emit("stop typing")
    })

    socket.on("new message",(newMessageObject)=>{
      const chat = newMessageObject.chat;

      if(!chat.users) console.log("backend::index.js :: socket for new mesage :: no users found in newly created messsage");
      chat.users.forEach((user)=>{
        if(user._id === newMessageObject.sender._id) return 

        socket.in(user._id).emit("message received",newMessageObject)
      })
    });

  });

})
.catch((err)=>{
  console.log("Error catched in app.js for MongoDb connnection",err)
});