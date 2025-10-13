import mongoose from "mongoose" 
const sudschema = new mongoose.Schema({ 
    text: String, 
    email: String, 
    password: String,
    role: { type: String, default: 'user' },
});
 export const signupdata= mongoose.model('SignupData',sudschema);