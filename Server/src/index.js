import app from "./app.js"
import { GetMongoDbConnnection } from "./db/index.js";
import { ErrorHandeller } from "./utils/ErrorHandeller.js";

const PORT = process.env.PORT; 
app.use(ErrorHandeller)

GetMongoDbConnnection()
.then((res)=>{
  app.listen(PORT, () => {
    console.log("Server is intilized on port :: ", PORT);
  });
})
.catch((err)=>{
  console.log("Error catched in app.js for MongoDb connnection",err)
});