import React, { useState } from 'react'
import Image from 'next/image'
import { assets } from '@/Assets/assets'
import { toast } from 'react-toastify';
import axios from 'axios';
import Link from 'next/link';

const Header = () => {

  // Linking email subscription with the backend:
  const [email,setEmail] = useState("");

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email",email);
    const response = await axios.post('/api/email',formData);
    if(response.data.success) {
      toast.success(response.data.msg);
      setEmail("");
    }
    else {
      toast.error("Error")
    }
  }

  return (
    <div className='py-5 px-5 md:px-12 lg:px-28'>
      <div className='flex justify-between items-center'>
        <Image src={assets.logo} width={180} alt='logo-img' className='w-[130px] sm:w-auto'/>
        <div className="flex gap-5 text-lg font-medium">
          <Link href={'/admin/addProduct'}><p>Add Blog</p></Link>
          <Link href={'/admin/blogList'}><p>Blog List</p></Link>
          <Link href={'/admin/subscriptions'}><p>Subscriptions</p></Link>

        </div>
      </div>

      <div className='text-center my-8'>
        <h1 className='text-3xl sm:text-5xl font-medium'>Latest Blogs</h1>
        <p className='mt-10 max-w-[740px] m-auto text-xs sm:text-base'>Share your thoughts, stories, and ideas with the world. Create, edit, and explore blogs in a clean, modern space.</p>
        <form onSubmit={onSubmitHandler} className='flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]'>
          <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='Enter your email' className='pl-4 outline-none'/>
          <button type='submit' className='border-l border-black py-4 px-4 sm:px-8 active:bg-grey-600 active:text-white'>Subscribe</button>
        </form>
      </div>
    </div>
  )
}

export default Header
