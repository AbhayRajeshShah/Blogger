import Img from "../assets/images/404.svg";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Default = () => {
  return (
    <div className="min-h-[100vh] box-border flex flex-col">
      <Navbar />
      <div className="flex my-auto flex-grow items-center justify-center gap-20">
        <img src={Img} className="w-[40rem] max-w-[80vw]" alt="" />
        <div>
          <p className="text-[3rem] font-bold text-gray-500">OOPS</p>
          <p className="mb-8 text-[2rem] font-bold text-gray-700">
            This page does not exist!
          </p>
          <Link to={"/"}>
            <button className="flex  px-6 py-3 bg-blue-500 text-white rounded-md">
              Go Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Default;
