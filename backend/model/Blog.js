import mongoose  from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title:{
       type: String ,
       required: true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        requried:true,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        requried:true,
    }
 
});

export default mongoose.model("Blog",blogSchema);