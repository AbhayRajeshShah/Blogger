const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

//setup environment
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.NODE_ENV || 3000;

//import models
const User = require("./models/User");
const Blog = require("./models/Blog");

//Use cors and json
app.use(cors());
app.use(express.json());

//connect MONGO DB
const MONGODB_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

//authentication routes
app.post("/signup", async (req, res) => {
  const { email, name, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email: email, password: password, name: name });
      user.save();
      res.status(300).json({ message: "Signed Up Successfully", body: user });
    } else {
      res.status(403).json({ message: "User already exists" });
    }
  } catch (e) {
    res.status(403).json({ message: "Something went wrong try again" });
  }
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    res.status(403).json({ message: "User with this email does not exist" });
  } else {
    if (user.password === password) {
      res.status(300).json({ message: "SignUp Successful", body: user });
    } else {
      res.status(403).json({ message: "Email and password do not match" });
    }
  }
});

//Blog routes
app.post("/new", async (req, res) => {
  const { title, body, uid, name } = req.body;
  let image = req.body.image || "";
  try {
    let blog = new Blog({
      title: title,
      body: body,
      userid: uid,
      authorName: name,
      image: image,
    });
    blog.save();
    res.status(300).json({ message: "Added Blog Successfully" });
  } catch (e) {
    res.status(400).json({ message: "Error", body: e });
  }
});

//edit Blog
app.put("/edit/:id", async (req, res) => {
  const { title, body } = req.body;
  let image = req.body.image || "";
  try {
    let blog = await Blog.findById(req.params.id);
    blog.title = title;
    blog.body = body;
    blog.image = image;
    blog.save();
    res.status(300).json({ message: "Edited Blog Successfully" });
  } catch (e) {
    res.status(400).json({ message: "Error", body: e });
  }
});

//delete Blog
app.delete("/delete/:id", async () => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(300).json({ message: "Deleted Blog Successfully" });
  } catch (e) {
    res.status(404).json({ message: "Failed to delete", body: e });
  }
});

app.listen(PORT, () => {
  console.log("Port started on : ", PORT);
});
