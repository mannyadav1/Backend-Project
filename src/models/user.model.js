import mongoose , {Schema} from 'mongoose';
import bcrypt from 'bcrypt';    
import jwt from 'jsonwebtoken';


const userSchema = new Schema({
      
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, 
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true, 
    },
    fullName: {
        type: String,
        required: true,
        trim: true, 
        index: true
    },
    avatar: {
        type: String, // cloudinary url
        required: true,
    },
    coverImage: {
        type: String, // cloudinary url
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    refreshToken: {
        type: String
    }


} , {
    timestamps : true
})
// this pre hook will be called before saving the user to the database, 
// and it will hash the password if it is modified. 
// This is useful for security purposes, as it will prevent the password from being stored in plain text in the database. The next function is called to move on to the next middleware or to save the user to the database if there are no more middlewares.
userSchema.pre('save' , async function(next){
    if(!this.isModified('password')) return next();


    this.password = await bcrypt.hash(this.password , 10);
    next();
})

// this comparePassword method will be used to compare the password that the user is trying to log in with the password that is stored in the database. It will return true if the passwords match and false if they don't match. This is useful for authentication purposes, as it will allow us to verify that the user is who they say they are when they try to log in.
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password , this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User' , userSchema);