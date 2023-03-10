import mongoose from "mongoose";
import Blog from "../model/Blog";
import User from "../model/User";

export const getAllBlogs = async (req, res, next) => {
  let blogs;

  try {
    blogs = await Blog.find().populate("user");
  } catch (err) {
    console.log(err);
  }

  if (!blogs) {
    return res.status(400).json({ msg: "No Blogs found !!!..." });
  }

  return res.status(200).json(blogs);
};

export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;
  let existingUser;

  try {
    existingUser = await User.findById(user);
  } catch (error) {
    console.log(error);
  }

  if (!existingUser) {
    return res.status(400).json({ msg: "Unable to find user by this id " });
  }

  const blog = new Blog({
    title,
    description,
    image,
    user,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }

  return res.status(200).json({ blog });
};

export const updateBlog = async (req, res, next) => {
  const { title, description, image } = req.body;
  const blog_id = req.params.id;
  let existingBlog;

  try {
    existingBlog = await Blog.findByIdAndUpdate(blog_id, {
      title,
      description,
      image,
    });
  } catch (err) {
    return console.log(err);
  }

  if (!existingBlog) {
    return res.status(500).json({ msg: "Unable to Update the blog" });
  }
  return res.status(200).json({ existingBlog });
};

export const getById = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (err) {
    console.log(err);
  }

  if (!blog) {
    return res.status(404).json({ msg: "NO blog found" });
  }
  return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res, next) => {
  const id = req.params.id;

  let blog;
  try {
    // populate work for the ref the collection or to move to another schema
    blog = await Blog.findByIdAndRemove(id).populate("user");
    console.log("find bala blog --> ",blog);
    // from  the blog going the user collection and deleting the blogs
    await blog.user.blogs.pull(blog);
    // await blog.users.blogs.pull(blog);
       console.log("user vala blogs ---> ",blog.user.blogs.pull(blog));

    await blog.user.save();
  } catch (error) {
    console.log(error);
  }

  if (!blog) {
    return res.status(500).json({ msg: "Unable to delete !!!..." });
  }
  return res.status(200).json({ msg: "Delete Successfully!!!..." });
};

export const getByUserId = async (req, res, next) => {
  const userId = req.params.id;

  let userBlogs;
  try {
    userBlogs = await User.findById(userId).populate("blogs");
  } catch (error) {
    console.log(error);
  }

  if (!userBlogs) {
    return res.status(404).json({ msg: "No Blog found" });
  }
  return res.status(404).json({ users: userBlogs });
};
