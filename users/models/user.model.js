'use strict'

const mongoose = require('../../common/services/mongoose.service').mongoose;
const { Schema } = mongoose;

const usersSchema = new Schema({
        
    name:{
        type:Schema.Types.String
    },
    username:{
        type:Schema.Types.String
    },
    user_image:{
        type:Schema.Types.String
    },
    email:{
        type:Schema.Types.String
    },
    password:{
        type:Schema.Types.String
    }

},{versionKey:false})

usersSchema.set('toJSON',{virtuals:false});

const Users = mongoose.model('users',usersSchema,'users');


exports.loginUser = (info)=>{

    return new Promise((resolve,reject)=>{

        Users.findOne({$or:[{email:info.eou},{username:info.eou}],password:info.password},{password:0}).exec((error,result)=>{
            
            if(error){
                reject(error.message);
                throw error.message;
                
            }
            
            if(result){
                console.log(result);
                resolve(result);

            }else{
                resolve(undefined);
            }
        })

    }).catch(error=>{
        throw error.message;
    })
       
    
}


exports.registerUser = (user)=>{

    try{

        const usr = new Users(user);
        return usr.save().catch(error=>error.message);
        

    }catch(error){
        throw error.message
    }
       
    
}

exports.updateUserPic = (userid,picname)=>{

    return new Promise((resolve,reject)=>{

        Users.findOneAndUpdate({_id:userid},{$set:{user_image:picname}},{new:true}).exec((error,user)=>{
            
            if(error){
                reject(error.message);
                throw error.message;
                
            }
            
            if(user){
                
            }else{
                resolve(undefined);
            }
        })

    }).catch(error=>{
        throw error.message;
    })
       
    
}
