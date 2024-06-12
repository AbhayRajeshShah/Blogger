import Cookies from "universal-cookie";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";

const ProfilePage = () => {
  const cookies = new Cookies();
  let userId = cookies.get("userId");
  if (!userId) {
    window.location.href = "/signin";
  }
  const [blogs, setBlogs] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    let data = await fetch(apiUrl + "/getUserBlogs/" + userId)
      .then((d) => d.json())
      .then((d) => d);
    setBlogs(data);
  };

  return (
    <div className="relative">
      <Navbar />
      <div className="flex md:px-28 sm:px-12 py-4 flex-wrap">
        {blogs.map((blog) => {
          return <BlogCard blogData={blog} />;
        })}
      </div>
      <button
        onClick={() => {
          window.location.href = "/newPost";
        }}
        className="fixed bg-blue-500 text-white bottom-16 right-16 w-16 h-16 rounded-full flex justify-center items-center "
      >
        <p className="text-[2rem] m-0">+</p>
      </button>
    </div>
  );
};

export default ProfilePage;
