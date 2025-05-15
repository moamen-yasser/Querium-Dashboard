import React from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const Breadcrumb = ({ title, items, isMobileScreen, isSidebarOpen, setIsSidebarOpen }) => {
return (
    <main className="w-full h-20 bg-white shadow-md px-4 lg:px-12 flex justify-between items-center">
        {/* Title */}
        {isMobileScreen && !isSidebarOpen ? (
            <button 
                onClick={() => setIsSidebarOpen(true)}
                className="z-20 bg-main text-white p-2 rounded-md shadow-lg"
            >
                <FaBars size={18} />
            </button>
        ): (
            <div className="text-title text-2xl font-bold">{title}</div>
        )}

        {/* Breadcrumb Items */}
        <div className="text-base font-semibold text-textSecondColor">
            {items?.map((item, index) => (
            <span key={index}>
                {index > 0 && <span className="mx-2">/</span>}
                {item?.link ? (
                <Link
                    to={item?.link}
                    className={`hover:text-hoverColor ${index === 1 ? "font-bold" : ""}`}
                >
                    {item?.label}
                </Link>
                ) : (
                <span className={index === 1 ? "font-bold" : ""}>{item?.label}</span>
                )}
            </span>
            ))}
        </div>
    </main>
);
};

export default Breadcrumb;