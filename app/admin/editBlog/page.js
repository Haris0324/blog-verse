'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { assets } from '@/Assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useSearchParams } from 'next/navigation'

const EditBlog = () => {
  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");

  const [image, setImage] = useState(null)
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "",
    authorImg: ""
  });

  // Load existing blog data
  useEffect(() => {
    const fetchBlog = async () => {
      const response = await axios.get(`/api/blog?id=${blogId}`);
      setData(response.data);
    };
    fetchBlog();
  }, [blogId]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg);
    if (image) formData.append("image", image); // only append if new image selected

    const response = await axios.put(`/api/blog?id=${blogId}`, formData);
    if (response.data.success) {
      toast.success("Blog updated!");
    } else {
      toast.error("Failed to update");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
      <p className='text-xl'>Update thumbnail</p>
      <label htmlFor="image">
        <Image
          className='mt-4'
          src={
            image
              ? URL.createObjectURL(image)
              : data.image
              ? data.image
              : assets.upload_area
          }
          alt='upload_area'
          width={140}
          height={20}
        />
      </label>
      <input type="file" id="image" hidden onChange={(e) => setImage(e.target.files[0])} />

      <p className='text-xl mt-4'>Blog title</p>
      <input name='title' value={data.title} onChange={onChangeHandler} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" required />

      <p className='text-xl mt-4'>Blog Description</p>
      <textarea name='description' value={data.description} onChange={onChangeHandler} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' rows={6} required />

      <p className='text-xl mt-4'>Blog category</p>
      <select name="category" value={data.category} onChange={onChangeHandler} className='w-40 mt-4 px-4 py-3 border'>
        <option value="Startup">Startup</option>
        <option value="Technology">Technology</option>
        <option value="Lifestyle">Lifestyle</option>
      </select>

      <br />
      <button type='submit' className='mt-8 w-40 h-12 bg-black text-white mb-10'>Update</button>
    </form>
  );
};

export default EditBlog;
