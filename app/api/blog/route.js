import { ConnectDB } from "@/lib/config/db"
import BlogModel from "@/lib/models/BlogModel";
const { NextResponse } = require("next/server")
import {writeFile} from 'fs/promises'
import fs from 'fs'

// Connecting with db:
const LoadDB = async () => {
    await ConnectDB();
}

LoadDB();

// Creating the api for the blog: When we send the GET req on /blog route this function will run
// Creating the functionality that we can display all the blogs stored in the database on the home page (api endpoint to get all blogs)
export async function GET(request) {
    // we will send the blogId to the backend using the paramters in the url that comes as req 
    // id is the key name for the dynamic route. from frontend we are sending the mongoId and we are storing it here.
    const blogId = request.nextUrl.searchParams.get('id');
    // If we are sending the blogId from the frontend then we will fetch the specific blog data
    if (blogId) {
        const blog = await BlogModel.findById(blogId);
        return NextResponse.json(blog);
    }
    // fetch all blogs to display at the home page:
    else {
        // This will fetch all the blogs from the BlogModel in the db.
        const blogs = await BlogModel.find({});

        return NextResponse.json({blogs});
    }

    
}

// api for storing the blog data: POST req is required: we will get the blog data as formData (api endpoint for uploading blogs)
export async function POST(request) {
    // we upload the image on the UI now that img will go in req and we save it in the public folder so that we can show it on the frontend also we store it on our mongoDB
    const formData = await request.formData();
    // timestamp to rename our img file
    const timeStamp = Date.now();
    // extracting the img
    const image = formData.get('image');
    // writing the logic so that we can store the image in the public folder:
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    // defining the path where we want to store image: timestamp rename the img name uniquely
    const path = `./public/${timeStamp}_${image.name}`
    // writing buffer on this path to store the img in a file. Now img will be stored in the public folder and we can access it in our blog app.
    await writeFile(path,buffer)

    const imgUrl = `/${timeStamp}_${image.name}`;

    const BlogData = {
        title:`${formData.get('title')}`,
        description:`${formData.get('description')}`,
        category: `${formData.get('category')}`,
        author:`${formData.get('author')}`,
        image: `${imgUrl}`,
        authorImg: `${formData.get('authorImg')}`,
    }

    // using the BlogData and BlogModel to store the data in the db
    await BlogModel.create(BlogData);
    console.log("Blog saved")

    return NextResponse.json({success:true,msg:'Blog Added'})

}

// creating api endpoint to delete blog:
export async function DELETE(request) {
    // from the frontend we will get the blog id as the parameter
    const id = await request.nextUrl.searchParams.get('id');
    const blog = await BlogModel.findById(id);
    // delete the image from the public folder of that blog
    fs.unlink(`./public/${blog.image}`,()=>{}) // 2nd argument is callback function
    // deleting the blog from db
    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({msg:"Blog Deleted"})
}

export async function PUT(request) {
  const id = request.nextUrl.searchParams.get("id");

  const formData = await request.formData();

  const updateData = {
    title: formData.get('title'),
    description: formData.get('description'),
    category: formData.get('category'),
    author: formData.get('author'),
    authorImg: formData.get('authorImg'),
  };

  const image = formData.get('image');
  if (image && typeof image.name === 'string') {
    const timeStamp = Date.now();
    const imageBuffer = Buffer.from(await image.arrayBuffer());
    const path = `./public/${timeStamp}_${image.name}`;
    await writeFile(path, imageBuffer);
    updateData.image = `/${timeStamp}_${image.name}`;
  }

  await BlogModel.findByIdAndUpdate(id, updateData);

  return NextResponse.json({ success: true, msg: "Blog updated successfully" });
}