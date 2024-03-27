import React from "react";
import ButtonShowMore from "../ButtonShowMore/ButtonShowMore";

const Comment = ({ comment, showMoreMap, handleShowMore }) => {
  return (
    <li key={comment.id} className="border rounded-md p-3 ml-3 my-3">
      <div className="flex gap-3 items-center">
        <h3 className="font-bold">{comment.by}</h3>
      </div>
      <p className="text-gray-600 mt-2">{comment.text}</p>
      {comment.kids && comment.kids.length > 0 && (
        <>
          <ButtonShowMore
            showMore={showMoreMap[comment.id]}
            onClick={() => handleShowMore(comment.id)}
          />
          {showMoreMap[comment.id] && (
            <ul>
              {comment.kids.map((nestedComment) => (
                <Comment
                  key={nestedComment.id}
                  comment={nestedComment}
                  showMoreMap={showMoreMap}
                  handleShowMore={handleShowMore}
                />
              ))}
            </ul>
          )}
        </>
      )}
    </li>
  );
};

export default Comment;
