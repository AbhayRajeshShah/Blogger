import { useState } from "react";
import loginGraphic from "../assets/images/login_infographic.svg";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const cookies = new Cookies();
  const apiUrl = process.env.REACT_APP_API_URL;

  const onSubmit = async (e) => {
    e.preventDefault();
    let status = 300;
    let data = await fetch(apiUrl + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((d) => {
        status = d.status;
        return d.json();
      })
      .then((d) => d);
    alert(data.message);
    if (status > 300) {
      setFormData({});
    } else {
      cookies.set("userId", data._id);
      window.location.href = "/";
    }
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="w-[100vw] flex-row-reverse overflow-hidden h-[100vh] flex items-center box-border">
      <div className="flex flex-[3] bg-blue-100 items-center h-full justify-center">
        <img
          src={loginGraphic}
          alt="Login Graphic"
          className="w-[30rem] object-cover"
        />
      </div>
      <div className="flex flex-col items-center  flex-[2] px-12 py-4">
        <p className="text-[2.5rem] my-[1.5rem] font-bold text-black">
          Glad to see you !
        </p>
        <form
          onSubmit={onSubmit}
          className="flex gap-[1.25rem] w-full items-center flex-col flex-1  py-4"
        >
          <input
            type="text"
            value={formData.name || ""}
            name="name"
            onChange={onChange}
            placeholder="User Name"
            className="border-black border-solid border-[1px] w-[20rem] px-8 py-4 rounded-md"
            required
          />
          <input
            type="email"
            value={formData.email || ""}
            name="email"
            onChange={onChange}
            placeholder="Email"
            className="border-black border-solid border-[1px] w-[20rem] px-8 py-4 rounded-md"
            required
          />
          <input
            type="password"
            value={formData.password || ""}
            name="password"
            onChange={onChange}
            placeholder="Password"
            className="border-black border-solid border-[1px] w-[20rem] px-8 py-4 rounded-md"
            required
          />
          <button
            className="align-left px-8 py-4 bg-blue-500 w-[20rem] max-w-[80%] text-white rounded-lg"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <div className="flex w-[20rem] my-[0.5rem] gap-[0.5rem] items-end">
          <p>Already have an account ?</p>
          <Link to={"/signin"}>Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
