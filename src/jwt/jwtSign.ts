import jwt, { SignOptions } from "jsonwebtoken";
import fs from "fs";
import path from "path"

const jwtSign = (data:{userId:String,data?:any},expiry:SignOptions["expiresIn"]):string=>{
    try{
        const privateKey = fs.readFileSync(path.resolve(__dirname, "../../private.key"));
        const token = jwt.sign({data},privateKey,{expiresIn:expiry,algorithm:"RS256"});
        return token;
    }catch(err){
        console.error(err);
        throw err;
    }

}

export default jwtSign