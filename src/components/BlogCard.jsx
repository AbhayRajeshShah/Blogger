import { Link } from "react-router-dom";
import "../index.css";
import ReactMarkdown from "react-markdown";
const BlogCard = ({ blogData, showOptions, onClick, index }) => {
  let d = new Date(parseInt(blogData.date));
  return (
    <div className="relative ">
      <div
        onClick={() => {
          window.location.href = "/blog/" + blogData._id;
        }}
        className="mx-4 h-full cursor-pointer hover:scale-105 transition-all flex flex-col justify-between w-[18rem] box-border rounded-lg overflow-hidden shadow-lg"
      >
        <div>
          {blogData.image ? (
            <img
              src={blogData.image}
              className="w-full h-[10rem]  object-cover"
              alt=""
            />
          ) : (
            <div className="w-full h-[10rem] bg-blue-300"></div>
          )}
          <p className="font-bold text-lg my-4 px-3">{blogData.title}</p>
          <div className="flex px-3 mx-3 py-1 my-4 rounded-md text-sm border-solid border-blue-500 text-blue-500 border-[1px] justify-center items-center w-fit">
            {blogData.category || "General"}
          </div>
          <ReactMarkdown className={"markdown px-3"}>
            {blogData.body.slice(0, 100).toString() + "..."}
          </ReactMarkdown>
        </div>
        <div className="px-4">
          <div className="flex justify-between my-4 items-center">
            <div className="flex gap-3 items-center">
              <div className="w-[3rem] h-[3rem] flex justify-center items-center text-white rounded-full bg-blue-500">
                <p>{blogData.authorName.toUpperCase()[0]}</p>
              </div>
              <p>{blogData.authorName}</p>
            </div>
            <p>{d.toString().slice(4, 16)}</p>
          </div>
        </div>
      </div>
      {showOptions ? (
        <div className="absolute top-0 z-10 right-0 flex items-center gap-4 translate-y-[-50%]">
          <Link to={"/edit/" + blogData._id}>
            <button className="flex items-center bg-yellow-100 justify-center w-12 h-12 rounded-full">
              <i className="fa-solid fa-pencil text-yellow-600"></i>
            </button>
          </Link>
          <button
            onClick={() => {
              onClick(blogData._id, index);
            }}
            className="flex z-10 bg-red-100 items-center justify-center w-12 h-12 rounded-full"
          >
            <i className="fa-solid fa-trash text-red-600"></i>
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default BlogCard;
