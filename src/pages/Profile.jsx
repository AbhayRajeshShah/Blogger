import Cookies from "universal-cookie";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  let { userId } = useParams();
  const cookies = new Cookies();
  if (!userId) {
    window.location.href = "/signin";
  }
  const [blogs, setBlogs] = useState([]);
  const [editable, setEditable] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    getBlogs();
  }, [userId]);

  const getBlogs = async () => {
    console.log(cookies.get("userId"));
    if (cookies.get("userId") === userId) {
      setEditable(true);
    } else {
      setEditable(false);
    }
    let data = await fetch(apiUrl + "/getUserBlogs/" + userId, {
      headers: {
        "Cache-Control": "no-cache",
      },
    })
      .then((d) => d.json())
      .then((d) => d);
    setBlogs(data);
  };

  const onDelete = async (blogId, index) => {
    await fetch(apiUrl + "/delete/" + blogId, { method: "DELETE" })
      .then((d) => d.json())
      .then((d) => d);
    setBlogs(blogs.filter((blog, i) => i !== index));
  };

  return (
    <div className="relative">
      <Navbar />
      <div className="flex md:px-28 gap-y-8 sm:px-12 py-4 flex-wrap">
        {blogs.map((blog, i) => {
          return (
            <BlogCard
              key={i}
              index={i}
              blogData={blog}
              onClick={onDelete}
              showOptions={editable}
            />
          );
        })}
      </div>
      {editable ? (
        <button
          onClick={() => {
            window.location.href = "/newPost";
          }}
          className="fixed bg-blue-500 text-white bottom-16 right-16 w-16 h-16 rounded-full flex justify-center items-center "
        >
          <p className="text-[2rem] m-0">+</p>
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProfilePage;
