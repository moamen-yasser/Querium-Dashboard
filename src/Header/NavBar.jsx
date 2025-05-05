import { useState } from "react";
import SearchInput from "../Components/SearchInput"; 

const NavBar = ({ setSearchQuery, searchQuery }) => {
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
        <div className="w-full h-full flex justify-center items-center gap-20">
            <SearchInput
                placeholder="Search lecture name, topic..."
                value={searchQuery || inputValue}
                onChange={handleInputChange}
                onClear={handleClearInput}
                className="w-[40%]"
            />
        </div>
    </main>
);
};

export default NavBar;