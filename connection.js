const mongoose = require("mongoose")

const connectionstring =process.env.DATABASE

mongoose.connect(connectionstring).then(res=>{
    console.log(`cookpedia connection successfull`);
    
}).catch(err=>{
    console.log(`Db connection failed`);
    console.log(err);
})