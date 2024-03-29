import React from "react";

const ButtonShowMore = ({ onClick, showMore }) => {
  return(
    <button
      className="mt-2 px-2 py-1   text-white capitalize transition-colors duration-300 transform bg-indigo-500 rounded-lg hover:bg-indigo-400  "
      onClick={onClick}
    >
      {!showMore ? "Показать еще" : "скрыть"}
    </button>
  );
};

export default ButtonShowMore;
