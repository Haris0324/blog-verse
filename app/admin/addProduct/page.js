'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { assets } from '@/Assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { setConfig } from 'next/config'

const AddProduct = () => {
    // when image is uploaded it should display in the image box
    const [image,setImage] = useState(false)
    // adding logic for adding data of the form in the database.
    const [data,setData] = useState({
        title:"",
        description:"",
        category:"Startup",
        author:"Alex Bennett",
        authorImg:"/author_img.png"

    })

    // gets the name value property on changing in the inputs fields
    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        // spread the previous old data and for the respective name field update its value that we will get from the input field
        setData((data) => ({...data,[name]:value}))
        console.log(data)
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        // constructing formData to be destructured in the POST req of blog
        const formData = new FormData();
        formData.append('title',data.title);
        formData.append('description',data.description);
        formData.append('category',data.category);
        formData.append('author',data.author);
        formData.append('authorImg',data.authorImg);
        formData.append('image',image);
        // sending data on the api we use axios
        const response = await axios.post('/api/blog',formData)
        if(response.data.success) {
            toast.success(response.data.msg);
            setImage(false);
            setData({
                title:"",
                description:"",
                category:"Startup",
                author:"Alex Bennett",
                authorImg:"/author_img.png"
            })
        }
        else {
            toast.error('Error')
        }
    }


  return (
    <>
        <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
            <p className='text-xl'>Upload thumbnail</p>
            <label htmlFor="image">
                <Image className='mt-4' src={!image?assets.upload_area:URL.createObjectURL(image)} alt='upload_area' width={140} height={20}/>
            </label>
            <input type="file" id='image' hidden required onChange={(e) => setImage(e.target.files[0])}/>
            <p className='text-xl mt-4'>Blog title</p>
            <input name='title' onChange={onChangeHandler} value={data.title} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Type here' required />
            <p className='text-xl mt-4'>Blog Description</p>
            <textarea name='description' onChange={onChangeHandler} value={data.description} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='write content here' rows={6} required />
            <p className='text-xl mt-4'>Blog category</p>
            <select name="category" onChange={onChangeHandler} value={data.category} className='w-40 mt-4 px-4 py-3 border text-gray-500'>
                <option value="Startup">Startup</option>
                <option value="Technology">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
            </select>
            <br />
            <button type='submit' className='mt-8 w-40 h-12 bg-black text-white mb-10'>ADD</button>
        </form>
    </>
  )
}

export default AddProduct
