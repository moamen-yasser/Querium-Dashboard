import { useState } from "react";
import SearchInput from "../Components/SearchInput"; 
import { FaBars } from "react-icons/fa";
import PropTypes from 'prop-types';

const NavBar = ({ setSearchQuery, searchQuery, isMobileScreen, isSidebarOpen, setIsSidebarOpen, data }) => {
const [inputValue, setInputValue] = useState("");

const handleInputChange = (e) => {
    const name = e.target.value.toLowerCase();
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
                placeholder="Search subject name ..."
                value={searchQuery || inputValue}
                onChange={handleInputChange}
                onClear={handleClearInput}
                className={isMobileScreen ? "w-[90%]" : "w-[40%]"}
            />
            <p className="font-bold text-sm">Total Subjects: {data?.length}</p>
        </div>
    </main>
);
};
NavBar.propTypes = {
    setSearchQuery: PropTypes.func.isRequired,
    searchQuery: PropTypes.string.isRequired,
    isMobileScreen: PropTypes.bool.isRequired,
    isSidebarOpen: PropTypes.bool.isRequired,
    setIsSidebarOpen: PropTypes.func.isRequired,
    data: PropTypes.string.isRequired,
};
export default NavBar;