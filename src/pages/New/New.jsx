import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOneNews } from "../../features/newsSlice";
import { getNestedComments } from "../../features/commentsSlice";
import { FaRegComment } from "react-icons/fa";
import Loading from "../../components/Loading/Loading";
import RefreshButton from "../../components/RefreshButtonCommeent/RefreshButtonComment";
import ButtonShowMore from "../../components/ButtonShowMore/ButtonShowMore";

const OneNews = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const oneNewsData = useSelector((state) => state.newsSlice.oneNews);
  const nestedComments = useSelector((state) => state.getNestedComments.nestedComments);
  const loadingComments = useSelector((state) => state.newsSlice.loadingComments);
  const [showMore, setShowMore] = useState({});

  useEffect(() => {
    dispatch(getOneNews(params.id));
  }, []);

  const handleRefresh = () => {
    dispatch(getOneNews(params.id));
  };

  const handleShowMore = (kidsId, commentId) => {
    setShowMore((prevMap) => ({
      ...prevMap,
      [commentId]: !prevMap[commentId],
    }));
    dispatch(getNestedComments(kidsId));
  };

  if (!oneNewsData) {
    return <Loading />;
  }
  const sortedComm = nestedComments.slice().sort((a, b) => b.time - a.time);
  const { news, comments } = oneNewsData;

  const renderComments = (comments) => {
    return loadingComments ? (
      <Loading />
    ) : (
      <ul>
        {comments.map((comment) => (
          <li key={comment.id} className="border rounded-md p-3 ml-3 my-3">
            <div className="flex gap-3 items-center">
              <h3 className="font-bold">{comment.by}</h3>
            </div>
            <p className="text-gray-600 mt-2">{comment.text}</p>
            {comment.kids && comment.kids.length > 0 && (
              <>
                <ButtonShowMore
                  showMore={!!showMore[comment.id]}
                  onClick={() => handleShowMore(comment.kids, comment.id)}
                />
                {showMore[comment.id] && renderNestedComments(nestedComments)}
              </>
            )}
          </li>
        ))}
      </ul>
    );
  };

  const renderNestedComments = (nestedComments) => {
    return (
      <ul>
        {sortedComm.map((comment) => (
          <li key={comment.id} className="border rounded-md p-3 ml-3 my-3">
            <div className="flex gap-3 items-center">
              <h3 className="font-bold">{comment.by}</h3>
            </div>
            <p className="text-gray-600 mt-2">{comment.text}</p>
          </li>
        ))}
      </ul>
    );
  };
  return (
    <>
      <div className="w-[1000px] mx-auto mt-[100px]">
        <Link
          className="m-auto mt-2 px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-indigo-500 rounded-lg hover:bg-indigo-400"
          to="/"
        >
          Назад
        </Link>
      </div>
      <div className="w-[1000px] mx-auto mt-[10px]">
        <div className="mb-12 flex flex-wrap justify-center">
          <div className="">
            <h5 className="mb-3 text-[26px] font-bold">{news.title}</h5>
            {news.url && (
              <a
                href={news.url}
                className="mb-4 capitalize text-neutral-500 dark:text-neutral-400 text-[14px]"
              >
                {news.url}
              </a>
            )}
            <p className="mb-4 capitalize text-neutral-500 dark:text-neutral-400 text-[14px]">
              Опубликовано <u>{new Date(news.time * 1000).toLocaleString()}</u>{" "}
              by {news.by}
            </p>
            <p className="mb-4 flex items-center text-neutral-500 dark:text-neutral-400 text-[14px]">
              <FaRegComment className="mr-1" />
              {comments.length} комментариев
            </p>
            <p className="mb-6 text-[20px] text-justify">{news.text}</p>
          </div>
          <div className="wFull shrink-0 grow-0 basis-auto px-3 md:w-10/12"></div>
        </div>
      </div>
      <div className="bg-white rounded-lg border p-2 w-[1000px] mx-auto">
        <h3 className="font-bold flex items-center">
          Комментарии <RefreshButton onClick={handleRefresh} />
        </h3>
        <div>
          {comments.length > 0 ? (
            renderComments(comments)
          ) : (
            <p>Нет комментариев</p>
          )}
        </div>
      </div>
    </>
  );
};

export default OneNews;
