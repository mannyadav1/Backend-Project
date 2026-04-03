import mongoose from 'mongoose';
import { DB_NAME } from '../constant.js';

const connectDb = async () => {     // async function because db is in other continent and it takes time to connect to it, so we need to wait for it to connect before we can use it.
    try{
        const connectionInstance = await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MongoDb connected !! DB HOST : ${connectionInstance.connection.host} `)  // this will log the host of the database that we are connected to, which is useful for debugging and monitoring purposes.;
        

    }
    catch(error){
        console.log('Error connecting to database' , error);
        process.exit(1);
        
    }
}  

export default connectDb;  