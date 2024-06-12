import { useState } from "react";
import Cookies from "universal-cookie";
import Navbar from "../components/Navbar";
import "./New.scss";

const NewBlog = ({ fD }) => {
  const cookies = new Cookies();
  const [formData, setFormData] = useState(fD || {});
  const apiUrl = process.env.REACT_APP_API_URL;
  let userId = cookies.get("userId");
  if (!userId) {
    window.location.href = "/signin";
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    let data = await fetch(apiUrl + "/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, uid: userId }),
    })
      .then((d) => d.json())
      .then((d) => d);
    alert(data.message);
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="new">
      <Navbar />
      <form onSubmit={onSubmit} className="md:px-32 sm:px-16 py-8">
        <div className="row">
          <p>Title *</p>
          <input
            type="text"
            placeholder="Blog title name"
            name="title"
            onChange={onChange}
            value={formData.title || ""}
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
            name="body"
            onChange={onChange}
            value={formData.body || ""}
            placeholder="Blog content here"
          ></textarea>
        </div>
        <div className="row">
          <button className="bg-blue-500 px-6 py-3 text-white rounded-md">
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewBlog;
