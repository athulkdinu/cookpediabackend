const jwt = require('jsonwebtoken')

const jwtMidlleware =(req,res,next)=>{
    console.log("inside jwtmiddleware");
    const authHeader = req.headers['authorization']
    if(authHeader){
        const token = authHeader.split(" ")[1]
    if(token){
        try {
            const jwtResponse =jwt.verify(token,process.env.JWTSECRET)
            req.role =jwtResponse.role
            req.payload=jwtResponse.email
            req.userId = jwtResponse.userId

            next()
        } catch (err) {
            res.status(500).json(err)
        }
        } else {
            res.status(404).json("Authorization failed ... token missing")
        }
    } else {
        res.status(404).json("Authorization failed ... token missing")
    }
}

module.exports = jwtMidlleware