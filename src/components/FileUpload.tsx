const CirclePlus = () => {
  return (
    <svg
      className="w-16 h-16 text-orange-500"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      color="currentColor"
      fill="none"
    >
      <path
        d="M12 8V16M16 12H8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
};

function FileUpload() {
  return (
    <div className="w-[20rem] h-[18rem] bg-[#42424a] rounded-2xl p-4 shadow-xl">
      <div className="p-2 w-full h-full border-2 border-dotted border-white rounded-2xl flex flex-col justify-center items-center gap-y-4 hover:bg-orange-400/10 transition-colors duration-300 ease-in-out">
        <CirclePlus />
        <p className="text-lg text-white text-center">
          click to browse or drag files here to start sharing
        </p>
      </div>
    </div>
  );
}

export default FileUpload;
