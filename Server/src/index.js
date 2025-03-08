import app from "./app.js"
import { GetMongoDbConnnection } from "./db/index.js";

const PORT = process.env.PORT; 

GetMongoDbConnnection()
.then((res)=>{
  app.listen(PORT, () => {
    console.log("Server is intilized on port :: ", PORT);
  });
})
.catch((err)=>{
  console.log("Error catched in app.js for MongoDb connnection",err)
});