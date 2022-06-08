import React, { useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/useHttp";
import { getAllQuotes } from "../lib/api";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
// const DUMMY_QUOTE = [
//   {
//     id: "q1",
//     author: "Nick",
//     text: "Learning DSA is full of tensions",
//   },
//   {
//     id: "q2",
//     author: "CJ",
//     text: "Learning React is fun",
//   },
//   {
//     id: "q3",
//     author: "Robot",
//     text: "Learning Node can also be fun",
//   },
//   {
//     id: "q4",
//     author: "AJ",
//     text: "Life is full of tensions",
//   },
// ];

function AllQuotes() {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />;
  }

  return (
    <>
      <QuoteList quotes={loadedQuotes} />
    </>
  );
}

export default AllQuotes;
