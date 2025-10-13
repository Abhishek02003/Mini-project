import mongoose from "mongoose" 
const founditems = new mongoose.Schema({ 
    title: String, 
    description: String, 
    location: String,
 name:String,
 phone:String,
 userEmail:String,
 status: { type: String, default: 'pending' },
});
 export const reportfound= mongoose.model('reportfound',founditems);