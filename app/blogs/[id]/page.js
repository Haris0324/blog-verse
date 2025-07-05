"use client"
import { assets, blog_data } from '@/Assets/assets';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import Footer from '@/Components/Footer';
import Link from 'next/link';
import axios from 'axios';

const SpecificBlog = () => {
    const params = useParams();
    // Fetching the data based on id and save each data object of each blog in data state variable
    const [data,setData] = useState(null);
    const fetchBlogData = async() => {
        // provide the id to the backend and our backend will find that blog corresponding to that id and display it in the frontend
        // we will send the mongoDb id as the query parameter like ?id=...
        // at the backend route will hit like this /api/blog?id=685396a6fc73963419912a95 and from that we fetch the id from the query parameters.
        const response = await axios.get('/api/blog',{
            params:{
                id:params.id
            }
        })
        // blog data will come in response store it in the data
        setData(response.data);
    }

    // data will be fetched when our page will be rendered
    useEffect(() => {
      fetchBlogData();
    }, [])
    
  return (
    data ? <>
        <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
            <div className='flex justify-between items-center'>
                <Link href='/'>
                    <Image src={assets.logo} alt='logo' width={180} className='w-[130px] sm:w-auto'/>
                </Link>
                
                <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]'>Get started <Image src={assets.arrow} alt='arrow-img'/></button>
            </div>

            <div className="text-center my-24">
                <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
                <Image className='mx-auto mt-6 border border-white rounded-full' src={data.authorImg} width={60} height={60} alt='author_img'/>
                <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
            </div>
        </div>

        <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
            <Image className='border-4 border-white' src={data.image} alt='blog-img' width={1280} height={720} />
            {/* Styling the blog description so that we can add heading,paras */}
            <div className='blog-content' dangerouslySetInnerHTML={{__html:data.description}}>

            </div>
            
            <div className='my-24'>
                <p className='text-black font-semibold my-4'>Share this article on social media</p>
                <div className="flex">
                    <Image src={assets.facebook_icon} width={50} alt='fb_icon' />
                    <Image src={assets.twitter_icon} width={50} alt='twitter_icon' />
                    <Image src={assets.googleplus_icon} width={50} alt='googleplus_icon' />

                </div>
            </div>
        </div>
        <Footer/>
    </>:<></>
  )
}

export default SpecificBlog
