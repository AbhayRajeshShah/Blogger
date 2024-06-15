import Navbar from "./components/Navbar";
import BlogCard from "./components/BlogCard";
import { useState, useEffect } from "react";
import noData from "./assets/images/noData.svg";
import Cookies from "universal-cookie";

function App() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const cookies = new Cookies();
  let userId = cookies.get("userId");

  const [blogs, setBlogs] = useState([]);
  const categories = [
    "Technology",
    "Lifestyle",
    "Finance",
    "Food and Drink",
    "Education",
    "Business",
    "Entertainment",
    "Sports",
    "Travel",
    "Health and Wellness",
  ];
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    filter();
  }, [category]);

  const filter = async (e) => {
    if (e) {
      e.preventDefault();
    }
    let status = 300;
    let fetchUrl = userId || "guest";
    let data = await fetch(apiUrl + "/getBlogs/" + fetchUrl, {
      method: "POST",
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category: category, search: search }),
    })
      .then((d) => {
        status = d.status;
        return d.json();
      })
      .then((d) => d);
    if (status === 300) {
      setBlogs(data.body);
    }
  };

  return (
    <div className="App">
      <Navbar />
      <div className="">
        <form
          onSubmit={filter}
          className="flex w-[30rem] justify-between items-center border-[#66666664] border-[2px] border-solid mx-auto px-8 py-4 my-8 rounded-lg"
        >
          <input
            type="text"
            placeholder="Search Blogs"
            className="focus:border-none outline-none flex-grow"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
        <div className="flex gap-3 max-w-[700px] justify-center flex-wrap mx-auto mb-8">
          {categories.map((c, i) => {
            return (
              <div
                key={i}
                className={
                  c === category
                    ? "px-4 cursor-pointer py-2 shadow-lg flex rounded-md justify-center items-center bg-blue-500 text-white"
                    : "px-4 cursor-pointer py-2 shadow-lg flex rounded-md justify-center items-center bg-white text-black "
                }
                onClick={() => {
                  if (c === category) {
                    setCategory("");
                  } else {
                    setCategory(c);
                  }
                }}
              >
                <p className="m-0">{c}</p>
              </div>
            );
          })}
        </div>
      </div>
      {blogs.length > 0 ? (
        <div className="flex items-stretch md:px-28 gap-y-8 sm:px-12 py-4 flex-wrap">
          {blogs.map((blog, i) => {
            return <BlogCard key={i} blogData={blog} showOptions={false} />;
          })}
        </div>
      ) : (
        <div className="w-fit justify-center mx-auto gap-6 items-center my-8 flex">
          <img src={noData} className="w-[20rem]" alt="" />
          <div>
            <p className="text-[3rem] font-bold">OOPS</p>
            <p className="text-lg text-gray-500">No results found</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
