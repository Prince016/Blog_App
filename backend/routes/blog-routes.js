import express from 'express'
import { addBlog, deleteBlog, getAllBlogs, getById, getByUserId, updateBlog } from '../controllers/blog-controller';
const blog_router = express.Router();

blog_router.get("/",getAllBlogs);
blog_router.post("/add",addBlog);
blog_router.put("/update/:id",updateBlog);
blog_router.get("/:id",getById);
blog_router.delete("/:id",deleteBlog);
blog_router.get("/user/:id",getByUserId)
  
export default blog_router;