import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const Navbar = () => {
  const cookies = new Cookies();
  let uid = cookies.get("userId");
  return (
    <nav className="md:px-32 sm:px-16 py-8 flex justify-between items-center font-black">
      <div className="text-lg flex-1 justify-start">
        <p className="font-bold  w-fit m-0">Blogger</p>
      </div>
      <div className="flex justify-end items-center gap-[3rem] flex-1 font-normal">
        <Link to={"/"}>Blogs</Link>

        {!uid ? (
          <>
            <Link to={"/signin"}>
              <button className="w-[10rem] px-4 py-2 outline-none shadow-[0_0px_7px_2px_rgba(0,0,0,0.3)] bg-white text-blue-500 rounded-md">
                {" "}
                Login
              </button>
            </Link>
            <Link to={"/signup"}>
              <button className="w-[10rem] px-4 py-2 outline-none bg-blue-500 text-white rounded-md">
                {" "}
                Sign Up
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to={"/profile"}>Profile</Link>
            <button
              onClick={() => {
                cookies.remove("userId", { path: "/" });
                window.location.href = "/signin";
              }}
              className="w-[10rem] px-4 py-2 outline-none bg-blue-500 text-white rounded-md"
            >
              {" "}
              Log Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
