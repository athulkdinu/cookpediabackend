const jwt = require('jsonwebtoken')

const adminJwtMiddleware = (req, res, next) => {
    console.log("Inside admin jwt Middleware");
    const token = req.headers['authorization'].split(" ")[1]
    if (token) {
        try {
            const jwtResponse = jwt.verify(token, process.env.JWTSECRET)
            req.role = jwtResponse.role
            req.payload = jwtResponse.email
            req.userId = jwtResponse.userId
            if (jwtResponse.role == "admin") {
                next()
            } else {
                res.status(401).json(`Authorization Failed... Only Admin can Access our Resources.`)
            }

        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(404).json("Authorization failed... Token Missing!!!")
    }
}

module.exports= adminJwtMiddleware