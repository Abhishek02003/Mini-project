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

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

app.post("/signup", async (req, res) => {
  try {
    const { text, email, password } = req.body;

    const checkmail = await signupdata.findOne({ email });
    if (checkmail) {
      return res.status(400).json({ message: "Email already exists!" });
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
    const { title, description, location, name, phone, userEmail } = req.body;

    const lostitem = new reportlost({
      title,
      description,
      location,
      name,
      phone,
      userEmail,
      status: 'pending',
    });
    await lostitem.save();

    res.status(201).json({ message: "Item registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/report-found", async (req, res) => {
  try {
    const { title, description, location, name, phone, userEmail } = req.body;

    const founditem = new reportfound({
      title,
      description,
      location,
      name,
      phone,
      userEmail,
      status: 'pending',
    });
    await founditem.save();

    res.status(201).json({ message: "Item registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/report-found", async (req, res) => {
  try {
    const founditems = await reportfound.find({ status: 'approved' });
    res.json(founditems);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
});

app.get("/report-lost", async (req, res) => {
  try {
    const lostitems = await reportlost.find({ status: 'approved' });
    res.json(lostitems);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
});

// Admin: list pending items
app.get("/admin/pending", async (req, res) => {
  try {
    const role = req.headers["x-role"];
    if (role !== "admin") {
      return res.status(403).json({ error: "Forbidden: admin only" });
    }
    const [lost, found] = await Promise.all([
      reportlost.find({ status: 'pending' }).lean(),
      reportfound.find({ status: 'pending' }).lean(),
    ]);
    const items = [
      ...lost.map((i) => ({ ...i, type: 'lost' })),
      ...found.map((i) => ({ ...i, type: 'found' })),
    ];
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// Admin: approve item by id and type
app.post("/admin/approve", async (req, res) => {
  try {
    const role = req.headers["x-role"];
    if (role !== "admin") {
      return res.status(403).json({ error: "Forbidden: admin only" });
    }
    const { id, type } = req.body;
    if (!id || !type) return res.status(400).json({ error: 'id and type are required' });
    const Model = type === 'lost' ? reportlost : reportfound;
    const updated = await Model.findByIdAndUpdate(id, { status: 'approved' }, { new: true });
    if (!updated) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item approved', item: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// Admin: delete item by id and type
app.post("/admin/delete", async (req, res) => {
  try {
    const role = req.headers["x-role"];
    if (role !== "admin") {
      return res.status(403).json({ error: "Forbidden: admin only" });
    }
    const { id, type } = req.body;
    if (!id || !type) return res.status(400).json({ error: 'id and type are required' });
    const Model = type === 'lost' ? reportlost : reportfound;
    const deleted = await Model.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// Return items reported by a specific user
app.get("/myitems", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: "email query parameter is required" });
    }

    const [lost, found] = await Promise.all([
      reportlost.find({ userEmail: email }).lean(),
      reportfound.find({ userEmail: email }).lean(),
    ]);

    const items = [
      ...lost.map((i) => ({ ...i, type: "lost" })),
      ...found.map((i) => ({ ...i, type: "found" })),
    ];

    res.json(items);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
});

app.delete("/report-found/:id", async (req, res) => {
  try {
    const role = req.headers["x-role"];
    if (role !== "admin") {
      return res.status(403).json({ error: "Forbidden: admin only" });
    }
    const deletedItem = await reportfound.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ message: "Item deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting item" });
  }
});

app.delete("/report-lost/:id", async (req, res) => {
  try {
    const role = req.headers["x-role"];
    if (role !== "admin") {
      return res.status(403).json({ error: "Forbidden: admin only" });
    }
    const deletedItem = await reportlost.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ message: "Item deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting item" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    console.log("[LOGIN] Incoming:", { email });

    const user = await signupdata.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found!" });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid password!" });
    }

    console.log("[LOGIN] Success for:", { email, userId: user._id });
    res.json({ message: "Login successful!", user });
  } catch (err) {
    console.error("[LOGIN] Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
