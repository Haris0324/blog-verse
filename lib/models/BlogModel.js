import mongoose from "mongoose";

// Creating the schema
const Schema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    category: {
        type:String,
        required:true
    },
    author: {
        type:String,
        required:true
    },
    image: {
        type:String,
        required:true
    },
    authorImg: {
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

// Creating the model based on schema: If blog model is already existing in mongoDb db then that is used otherwise create the new model named blog
const BlogModel = mongoose.models?.Blog || mongoose.model('Blog',Schema);
export default BlogModel;