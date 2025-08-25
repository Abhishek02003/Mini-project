    import express from "express";
    import mongoose from "mongoose";
    import cors from "cors";
    import bodyParser from "body-parser";
    import { signupdata } from "./models/signupdata.js";
    import { reportlost } from "./models/reportlost.js";
    import { reportfound } from "./models/reportfound.js";

    const app = express();

    app.use(cors());
    app.use(bodyParser.json());

    mongoose.connect("mongodb://localhost:27017/foundit", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ MongoDB Error:", err));



    app.post("/signup", async (req, res) => {
    try {
        const { text, email, password } = req.body;
        
        const checkmail= await signupdata.findOne({email});
        if(checkmail){
        return res.status(400).json({message:"Email already exists!"})
}
        const newUser = new signupdata({ text, email, password });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
    });


    app.post("/report-lost", async (req, res) => {
    try {
        const { title, description, location } = req.body;

        const lostitem = new reportlost({ title, description, location });
        await lostitem.save();

        res.status(201).json({ message: "Item registered successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
    });


    app.post("/report-found", async (req, res) => {
    try {
        const { title, description, location } = req.body;

        const founditem = new reportfound({ title, description, location });
        await founditem.save();

        res.status(201).json({ message: "Item registered successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
    });


    app.get("/report-found", async (req,res)=>{
try{
    const founditems=await reportfound.find();
    res.json(founditems);
}catch(err){
    console.log(err);
    res.status(500).json({error:"server error"});
}
    });


     app.get("/report-lost", async (req,res)=>{
try{
    const lostitems=await reportlost.find();
    res.json(lostitems);
}catch(err){
    console.log(err);
    res.status(500).json({error:"server error"});
}
    });


    app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await signupdata.findOne({ email });

        if (!user) {
        return res.status(400).json({ error: "User not found!" });
        }

        
        if (user.password !== password) {
        return res.status(400).json({ error: "Invalid password!" });
        }

        res.json({ message: "Login successful!", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
    });

    const PORT = 5000;
    app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    });
