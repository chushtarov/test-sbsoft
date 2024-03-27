import React, { useEffect } from "react";
import RefreshButton from "../../components/RefreshButtonNews/RefreshButtonNews";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../features/newsSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const News = () => {
  const newsAll = useSelector((state) => state.news);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getNews());

    const intervalId = setInterval(() => {
      dispatch(getNews());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const handleRefresh = () => {
    dispatch(getNews());
  };

  const handleNavigate = (id) => {
    navigate(`/${id}`);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return (
      <Loading/>
    );
  }

  const sortedNews = newsAll.slice().sort((a, b) => b.time - a.time);

  return (
    <>
      <RefreshButton onClick={handleRefresh} />
      <ul
        role="list"
        className="divide-y divide-gray-200 w-[1000px] m-auto border px-4 mt-4 rounded-md"
      >
        {sortedNews.map((item) => (
          <li
            onClick={() => handleNavigate(item.id)}
            key={item.id}
            className="flex justify-between  gap-x-6 py-5"
          >
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm cursor-pointer font-semibold leading-6 text-gray-900">
                  {item.title}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  рейтинг: {item.score}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm  leading-6 text-gray-900">
                автор: {item.author}
              </p>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                {item.time}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default News;
