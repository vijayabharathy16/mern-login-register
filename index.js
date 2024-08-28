const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./Models/User");
// require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

mongoose
  .connect("mongodb+srv://vijayabharathy753:Ju92ssWI1opEcFfM@cluster0.w45sz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connected to Mongodb");
  })
  .catch((err) => {
    console.log("connection err:", err);
  });

app.get("/", async (req, res) => {
  res.send("Welcome to the page");
});

// app.post("/register", async (req, res) => {
// //   const { name, email, password } = req.body;
//   try {
//     const storePassword = await bcrypt.hash(req.body.password, 10);
//     await User.create({
//       name: req.body.name,
//       email: req.body.email,
//       password: storePassword,
//     });
//     res.json({ status: "ok", message: "Signup created successfully" });
//   } catch (error) {
//     res.json({ status: "error", error: error.message });
//   }
// });

app.post('/register',async(req,res) =>{
    try {
        const newPassword = await bcrypt.hash(req.body.password,10);
        await User.create({
            name:req.body.name,
            email:req.body.email,
            password:newPassword
        })
        res.json({status: 'ok', message:'Signup created successfully'})
    } catch (error) {
        res.json({status:'error', error: error.message})
    }
});
app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return { status: "err", error: "Invalid Login" };
  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret12345"
    );
    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "err", user: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
