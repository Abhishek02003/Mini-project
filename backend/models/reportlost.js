import mongoose from "mongoose" 
const lostitems = new mongoose.Schema({ 
    title: String, 
    description: String, 
    location: String, });
 export const reportlost= mongoose.model('reportlost',lostitems);