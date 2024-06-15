import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import Spinner from "../assets/images/spinner.gif";
import "./New.scss";

const NewBlog = ({ fD }) => {
  const cookies = new Cookies();
  const [formData, setFormData] = useState(fD || {});
  const [access, setAccess] = useState(true);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;
  const { id } = useParams();

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
  const [category, setCategory] = useState(categories[0]);

  const getBlogData = async () => {
    let status = 300;
    console.log(id);
    let data = await fetch(apiUrl + "/getBlog/" + id, {
      headers: {
        "Cache-Control": "no-cache",
      },
    })
      .then((d) => {
        status = d.status;
        console.log(d);
        return d.json();
      })
      .then((d) => d);
    console.log(data);
    if (status === 300) {
      if (data.body.userid === cookies.get("userId")) {
        setFormData({
          title: data.body.title,
          body: data.body.body,
          image: data.body.image || "",
        });
        setCategory(data.body.category);
        setEdit(true);
      } else {
        setAccess(false);
      }
    } else {
      setAccess(false);
    }
  };
  useEffect(() => {
    if (id) {
      getBlogData();
    }
  }, [id]);

  let userId = cookies.get("userId");
  if (!userId) {
    window.location.href = "/signin";
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    let fetchUrl = !edit ? "/new" : "/edit/" + id;
    setLoading(true);
    let data = await fetch(apiUrl + fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, uid: userId, category: category }),
    })
      .then((d) => d.json())
      .then((d) => d);
    setLoading(false);
    console.log(data.message);
    alert(data.message);
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="new">
      <Navbar />
      {access ? (
        <form onSubmit={onSubmit} className="md:px-32 sm:px-16 py-8">
          <div className="flex w-[30rem] gap-3 justify-center flex-wrap mx-auto my-8">
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
                    setCategory(c);
                  }}
                >
                  <p className="m-0">{c}</p>
                </div>
              );
            })}
          </div>
          <div className="row">
            <p>Title *</p>
            <input
              type="text"
              placeholder="Blog title name"
              name="title"
              onChange={onChange}
              value={formData.title || ""}
              required
            />
          </div>
          <div className="row">
            <p>Cover Image Url</p>
            <input
              type="text"
              placeholder="Blog Image Url, eg:https://imgur.com/12312"
              name="image"
              onChange={onChange}
              value={formData.image || ""}
            />
          </div>
          <div className="row">
            <p>Content *</p>
            <textarea
              minLength={200}
              name="body"
              onChange={onChange}
              value={formData.body || ""}
              placeholder="Blog content here"
              required
            ></textarea>
          </div>
          <div className="row">
            <button className="bg-blue-500 flex justify-center items-center px-6 py-3 w-[10rem] text-white rounded-md">
              {!loading ? (
                !edit ? (
                  "Create Post"
                ) : (
                  "Edit Post"
                )
              ) : (
                <img className="w-6 h-6 object-cover" src={Spinner} />
              )}
            </button>
          </div>
        </form>
      ) : (
        <>
          <p>404</p>
        </>
      )}
    </div>
  );
};

export default NewBlog;
