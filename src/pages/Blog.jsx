import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ReactMarkdown from "react-markdown";

const Blog = () => {
  const { id } = useParams();
  const [blogContent, setBlogContent] = useState({});
  const [found, setFound] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const fetchBlog = async () => {
    let status = 300;
    console.log("Hi");
    let data = await fetch(apiUrl + "/getBlog/" + id, {
      headers: {
        "Cache-Control": "no-cache",
      },
    })
      .then((d) => {
        status = d.status;
        return d.json();
      })
      .then((d) => d);
    console.log(data.body);
    if (status === 300) {
      setFound(true);
      setBlogContent(data.body);
    }
  };
  useEffect(() => {
    fetchBlog();
  }, [id]);

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
                    className="w-full h-[20rem] object-top object-cover rounded-xl"
                  />
                  <div className="absolute bg-black opacity-50 top-0 left-0 w-full h-full"></div>
                </>
              ) : (
                <div className="w-full h-[20rem] bg-blue-200"></div>
              )}
              <div className="absolute px-8 py-4 shadow-lg w-[30rem]  z-10 bottom-[-3rem] bg-white left-[3rem] rounded-xl text-black">
                <div className="flex flex-col gap-2"></div>
                <div className="flex px-3 py-2 my-2 rounded-md  border-solid border-blue-500 text-blue-500 border-[1px] justify-center items-center w-fit">
                  {blogContent.category || "General"}
                </div>
                <p className="w-[20rem] text-[2rem] font-bold">
                  {blogContent.title}
                </p>
                <Link to={"/profile/" + blogContent.userid}>
                  <div className="">
                    <div className="flex justify-between my-3 items-center">
                      <div className="flex gap-3 items-center">
                        <div className="w-[3rem] h-[3rem] flex justify-center items-center text-white rounded-full bg-blue-500">
                          <p>{blogContent.authorName.toUpperCase()[0]}</p>
                        </div>
                        <p>{blogContent.authorName}</p>
                      </div>
                      <p>{d.toString().slice(4, 16)}</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <ReactMarkdown className="my-20">{blogContent.body}</ReactMarkdown>
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
