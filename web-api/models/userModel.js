const mongoose = require('mongoose')
const bcrypt= require('bcryptjs')
const jwt=require('jsonwebtoken')
const validator= require('validator')

const userSchema=new mongoose.Schema({
    name: { type:String, required: true, trim: true,unique:true},
    fname: { type:String, required: true, trim: true},
    lname: { type:String, required: true, trim: true},
    email:{type:String, required: true,unique:true,lowercase:true,
        validator: (value)=>{
            if(!validator.isEmail(value)){
                throw new Error({error:'Invalid email address'})
            }
        }
    },
    password:{type:String, required: true,minlength:6},  // hashed password
    tokens:[{
        token:{type:String,required: true}
    }],
    created: {  type: Date,  required: true,  default: Date.now},
    updated: {  type: Date, required: true, default: Date.now}
})

// schema-level middleware
userSchema.pre('save',async function(next){
    const user=this
    if(user.isModified('password')){
        // salt+hash encryption
        user.password=await bcrypt.hash(user.password, 10)
    }
    // continue
    next()
})

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const payload ={
        _id: user._id,
        email: user.email
    }
    const token=jwt.sign(   payload, process.env.TOKEN_KEY,
                            {
                                expiresIn:'2h',
                                issuer:'Awesome API v3'
                            })
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials= async (email,password)=>{
    try {
        var vemail=(email.indexOf('@')===-1)? {name:email}:{email:email};
        const user=await User.findOne(vemail)
        if(!user){
            throw new Error()
        }
        // compare provided 'password' with hashed 'user.password'
        const isPasswordMatch=await bcrypt.compare(password,user.password)
        if(!isPasswordMatch){
            throw new Error()
        }
        return user
    } catch (error) {
        return null
    }
}

const User=mongoose.model('User',userSchema)
module.exports =User