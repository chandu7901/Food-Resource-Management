const jwt=require('jsonwebtoken')
const config = require('config')

module.exports=function(req,res,next){

    const token = req.header('x-auth-token')

    if(!token)
    {
        return res.status(401).json({msg:'No token auth failed'})
    }

    try{
        // console.log("decoded")
        const decoded=jwt.verify(token,config.get('jwtSecret'))
        // console.log("decoded-1")
        req.user=decoded.user
        req.adminuser=decoded.adminuser
        next()
    }
    catch(err)
    {
        // console.log(err)
        res.json({msg:'token is not valid'})
    }    

}