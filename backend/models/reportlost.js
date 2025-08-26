import mongoose from "mongoose" 
const lostitems = new mongoose.Schema({ 
    title: String, 
    description: String, 
    location: String,
    name: String,
    phone:String, 
});
 export const reportlost= mongoose.model('reportlost',lostitems);