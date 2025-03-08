import mongoose  from "mongoose";

export const GetMongoDbConnnection  = async ()=>{
    try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_CONNECTION_URL)

    console.log("MongoDB connection Successfull::", connectionInstance.connection.name)
        
    } catch (error) {
        console.log("Error in index.js :: GetMongoDbConnection",error)
    }
}