import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ title, items }) => {
return (
    <main className="w-full h-20 bg-white shadow-md mb-1 px-12 flex justify-between items-center">
        {/* Title */}
        <div className="text-title text-2xl font-bold">{title}</div>

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