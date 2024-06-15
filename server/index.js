const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

//setup environment
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.NODE_ENV || 3003;

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
      res.status(300).json({ message: "Login Successful", body: user });
    } else {
      res.status(403).json({ message: "Email and password do not match" });
    }
  }
});

//Blog routes
app.post("/new", async (req, res) => {
  try {
    const { title, body, uid, category } = req.body;
    let image = req.body.image || "";
    let user = await User.findById(uid);
    if (title && body) {
      let blog = new Blog({
        title: title,
        body: body,
        userid: uid,
        authorName: user.name,
        image: image,
        category: category,
      });
      blog.save();
      res.status(300).json({ message: "Added Blog Successfully" });
    }
  } catch (e) {
    res.status(400).json({ message: "Error", body: e });
  }
});

//edit Blog
app.post("/edit/:id", async (req, res) => {
  try {
    const { title, body, category } = req.body;
    let image = req.body.image || "";
    let blog = await Blog.findById(req.params.id);
    blog.title = title;
    blog.body = body;
    blog.image = image;
    blog.category = category;
    blog.save();
    res.status(300).json({ message: "Edited Blog Successfully" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Error", body: e });
  }
});

//delete Blog
app.delete("/delete/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(300).json({ message: "Deleted Blog Successfully" });
  } catch (e) {
    res.status(404).json({ message: "Failed to delete", body: e });
  }
});

app.get("/getUserBlogs/:id", async (req, res) => {
  let blogs = await Blog.find({ userid: req.params.id });
  res.json(blogs);
});

app.get("/getBlog/:id", async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      res.status(404).json({ message: "Blog not Found" });
    } else {
      res.status(300).json({ message: "Blog Found!", body: blog });
    }
  } catch (e) {
    res.status(404).json({ message: "Blog not Found" });
  }
});

app.post("/getBlogs/:id", async (req, res) => {
  try {
    let userId = req.params.id;
    let { category, search } = req.body;
    let query = { title: { $regex: search } };
    if (userId !== "guest") {
      query["userid"] = { $ne: userId };
    }
    if (category) {
      query["category"] = category;
    }
    let blogs = await Blog.find(query);
    res
      .status(300)
      .json({ message: "Blogs retrieved successfully", body: blogs });
  } catch (e) {
    res.status(404).json({ message: "Error" });
  }
});

app.listen(PORT, () => {
  console.log("Port started on : ", PORT);
});
