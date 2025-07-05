"use client"
import BlogList from "@/Components/BlogList";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <>
    {/* Toast Container will display the toast */}
      <ToastContainer theme="dark"/>
      <Header/>
      <BlogList/>
      <Footer/>
    </>
  );
}
