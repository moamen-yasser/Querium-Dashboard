import React from "react";

    const Loader = ({ isLoading }) => {
    if (!isLoading) return null;

    return (
    <div className="flex justify-center items-center w-full">
        <div
        className=" border-solid border-8 border-zinc-100 
        border-t-8 border-t-main w-12 h-12 rounded-full animate-spin"
        ></div>
    </div>
    );
};

export default Loader;
