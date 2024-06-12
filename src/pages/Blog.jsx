import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const Blog = () => {
  const { id } = useParams();
  const [blogContent, setBlogContent] = useState({});
  const [found, setFound] = useState(false);
  console.log(id);
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    fetchBlog();
  }, []);
  const fetchBlog = async () => {
    let status = 300;
    let data = await fetch(apiUrl + "/getBlog/" + id)
      .then((d) => {
        status = d.status;
        return d.json();
      })
      .then((d) => d);
    if (status === 300) {
      setFound(true);
      setBlogContent(data.body);
    }
  };
  let d = new Date(parseInt(blogContent.date));

  return (
    <>
      {found ? (
        <>
          <Navbar />
          <div className="md:px-32 px-16 flex flex-col">
            <div className="relative">
              {blogContent.image ? (
                <>
                  <img
                    alt=""
                    src={blogContent.image}
                    className="w-full h-[20rem] object-cover rounded-xl"
                  />
                  <div className="absolute bg-black opacity-50 top-0 left-0 w-full h-full"></div>
                </>
              ) : (
                <div className="w-full h-[20rem] bg-blue-200"></div>
              )}
              <div className="absolute px-8 py-4 shadow-lg w-[30rem]  z-10 bottom-[-2rem] bg-white left-[3rem] rounded-xl text-black">
                <p className="w-[20rem] text-[2rem] font-bold">
                  {blogContent.title}
                </p>
                <div className="">
                  <div className="flex justify-between my-4 items-center">
                    <div className="flex gap-3 items-center">
                      <div className="w-[3rem] h-[3rem] flex justify-center items-center text-white rounded-full bg-blue-500">
                        <p>{blogContent.authorName.toUpperCase()[0]}</p>
                      </div>
                      <p>{blogContent.authorName}</p>
                    </div>
                    <p>{d.toString().slice(4, 16)}</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="my-16">{blogContent.body}</p>
          </div>
        </>
      ) : (
        <>
          <Navbar />
          <p className="md:px-32 px-16">Blog not found</p>
        </>
      )}
    </>
  );
};

export default Blog;
