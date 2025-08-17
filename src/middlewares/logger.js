const logger = (req,res,next)=>{
    console.log(`Method: ${req.method} and Url: ${req.originalUrl}`);

    next();
}
export default logger