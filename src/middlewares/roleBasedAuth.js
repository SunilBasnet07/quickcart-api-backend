const roleBasedAuth=(role)=>{
   return (req,res,next)=>{
    const user = req.user;
    if(!user.roles.includes(role)) return res.status(403).send("Access denied.")
        next();

    }

}
export default roleBasedAuth;