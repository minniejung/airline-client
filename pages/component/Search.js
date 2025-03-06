import { useState } from "react";
import { FaRegCalendarAlt, FaRegUser } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { HiMiniArrowsRightLeft } from "react-icons/hi2";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { LuArrowRightLeft } from "react-icons/lu";
import { RiCircleLine } from "react-icons/ri";

function Search({ onSearch }) {
  const [textDestination, setTextDestination] = useState("");

  const handleChange = (e) => {
    setTextDestination(e.target.value.toUpperCase());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleSearchClick = () => {
    console.log("검색 버튼을 누르거나, 엔터를 치면 search 함수가 실행됩니다");

    // TODO:
    if (onSearch) {
      onSearch({ departure: "ICN", destination: textDestination });
    }
  };

  return (
    <div className="searchWrapper">
      <div className="searchTapDropdowns">
        <div className="searchTapDropdown">
          <LuArrowRightLeft />
          <span>Round Trip</span>
          <IoMdArrowDropdown />
        </div>
        <div className="searchTapDropdown">
          <FaRegUser />
          <span>1</span>
          <IoMdArrowDropdown />
        </div>
        <div className="searchTapDropdown">
          <span>Economy</span>
          <IoMdArrowDropdown />
        </div>
      </div>

      <div className="inputWrapper">
        <div className="inputGrid">
          <div className="inputContainer departure">
            <span className="inputIcon">
              <RiCircleLine />
            </span>
            <input id="input-departure" type="text" disabled value="ICN" />

            <div className="arrowSwap">
              <HiMiniArrowsRightLeft />
            </div>
          </div>

          <div className="inputContainer">
            <span className="inputIcon destination">
              <IoLocationOutline />
            </span>
            <input
              id="input-destination"
              className="destination"
              type="text"
              value={textDestination}
              onChange={handleChange}
              placeholder="CJU, BKK, PUS 중 하나를 입력하세요"
              onKeyUp={handleKeyPress}
            />
          </div>
        </div>

        <div className="inputGrid inputCalendar">
          <div className="inputGrid calendarItem">
            <FaRegCalendarAlt /> <span>Departure</span>
          </div>
          <div className="inputGrid calendarItem">
            <div className="bar" />
            <span>Return</span>
          </div>
        </div>
      </div>

      <button id="search-btn" className="btn" onClick={handleSearchClick}>
        <FaMagnifyingGlass /> Explore
      </button>
    </div>
  );
}

export default Search;
