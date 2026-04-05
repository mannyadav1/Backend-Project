const asyncHandler = (requestHandler) => {
    (req,res,next)=> {
        Promise.resolve(requestHandler(req,res,next)).
        catch((err)=> next(err));
    }
}

export {asyncHandler};


// const asynHandler = () =>{}
// const asynHandler = (func)=>() => {}
// const asynHandler = (func) => async () => {}

/*  const asynHandler = (func) => async (req,res,next) => {
    try{
        await func(req,res,next);
    }
    catch(error){
    res.status(500).json({
        success : false,
        message : error.message || "Internal Server Error"
    })
    }
} 
 */

