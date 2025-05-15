import { useState } from "react";
import SearchInput from "../Components/SearchInput"; 
import { FaBars } from "react-icons/fa";

const NavBar = ({ setSearchQuery, searchQuery, isMobileScreen, isSidebarOpen, setIsSidebarOpen }) => {
const [inputValue, setInputValue] = useState("");

const handleInputChange = (e) => {
    const name = e.target.value;
    setInputValue(name);
    setSearchQuery(name); 
};

const handleClearInput = () => {
    setInputValue("");
    setSearchQuery(""); 
};

return (
    <main className="w-full h-20 shadow-md mb-5 bg-white">
        <div className={`w-full h-full flex justify-center items-center gap-2 px-4`}>
        {isMobileScreen && !isSidebarOpen && (
                <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="z-20 bg-main text-white p-2 rounded-md shadow-lg"
                >
                    <FaBars size={18} />
                </button>
            )}
            <SearchInput
                placeholder="Search lecture name, topic..."
                value={searchQuery || inputValue}
                onChange={handleInputChange}
                onClear={handleClearInput}
                className={isMobileScreen ? "w-[90%]" : "w-[40%]"}
            />
        </div>
    </main>
);
};

export default NavBar;