const BlogCard = ({ blogData }) => {
  let d = new Date(parseInt(blogData.date));
  return (
    <div
      onClick={() => {
        window.location.href = "/blog/" + blogData._id;
      }}
      className="mx-4 cursor-pointer hover:scale-105 transition-all flex flex-col w-[20rem] box-border rounded-lg overflow-hidden shadow-lg"
    >
      {blogData.image ? (
        <img
          src={blogData.image}
          className="w-full h-6rem object-cover"
          alt=""
        />
      ) : (
        <div className="w-full h-6rem bg-blue-300"></div>
      )}
      <div className="px-4">
        <p className="font-bold text-lg my-4">{blogData.title}</p>
        <p>{blogData.body.slice(0, 100)}...</p>
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
  );
};

export default BlogCard;
