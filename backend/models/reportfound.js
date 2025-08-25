import mongoose from "mongoose" 
const founditems = new mongoose.Schema({ 
    title: String, 
    description: String, 
    location: String, });
 export const reportfound= mongoose.model('reportfound',founditems);