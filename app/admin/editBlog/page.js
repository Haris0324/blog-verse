import { Suspense } from "react";
import EditBlogFeature from "@/Components/AdminComponents/EditBlogFeature";
import React from 'react'

const EditBlog = () => {
  return (
    <Suspense fallback={<div>Loading blog...</div>}>
      <EditBlog />
    </Suspense>
  )
}

export default EditBlog

