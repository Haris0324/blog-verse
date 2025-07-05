import { assets } from '@/Assets/assets'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const BlogItem = ({title,description,category,image,id}) => {
  return (
    <div className='blogitem-hover max-w-[330px] sm:max-w-[300px] bg-white border border-black'>
      <Link href={`/blogs/${id}`}>
        <Image src={image} alt='post-img' width={400} height={400} className='border-b border-black'/>
      </Link>
      <p className='ml-5 mt-5 px-1 inline-block bg-black text-white text-sm'>{category}</p>
      <div className='p-5'>
        <h5 className='mb-2 text-lg font-medium tracking-tight text-grey-900'>{title}</h5>
        {/* Limiting the characters of description so that it display only few on the home page */}
        <p className='mb-3 text-sm tracking-tight text-grey-700'
        dangerouslySetInnerHTML={{__html:description.slice(0,120)}}></p>
        <Link href={`/blogs/${id}`} className="inline-flex items-center py-2 font-semibold text-center">
            Read more <Image src={assets.arrow} alt='arrow-icon' width={12} className='ml-2'/>
        </Link>
      </div>
    </div>
  )
}

export default BlogItem

// dangerouslySetInnerHTML={{__html:description}} will fetch data from the backend and set it in the p tag as html
