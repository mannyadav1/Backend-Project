// require('dotenv').config({path : './env'});
import dotenv from 'dotenv';

import connectDb from './db/index.js';

dotenv.config({path : './env'});

connectDb()
.then(()=>{

    app.on("error", (error) =>{
        console.log("Error :" , error);  // this will log the error to the console if there is an error with the app, such as if the port is already in use or if there is a problem with the server.
        throw error;
     })

    app.listen(process.env.PORT || 8000 , ()=>{   
        console.log(`Server is running on port : ${process.env.PORT || 8000}`);
        
    })
    
})
.catch((err)=>{
    console.log('Error connecting to database' , err);
    
})



// when a asynchoronous function is called, it returns a promise. If the function throws an error, the promise will be rejected with that error. If the function returns a value, the promise will be resolved with that value. If the function does not return anything, the promise will be resolved with undefined.























/* function connectDb(){}
    
 connectDb();    */    


/*
;( async () =>{
    try{
         await  mongoose.connect(`${process.env.MONGO_URI} / ${DB_NAME}`)
         app.on("error", (error) =>{
            console.log("Error :" , error);  // this will log the error to the console if there is an error with the app, such as if the port is already in use or if there is a problem with the server.
            throw error;
         })

         app.listen(process.env.PORT, () =>{
            console.log(`App is listening on port ${process.env.PORT}`);
         })
    }
    catch(error){
        console.log('Error connecting to database', error);
        throw error;
    }
} ) ()    // this is called IIFE (immediately invoked function expression) this is used to run async code at the top level without having to create a separate function and then call it.



*/