import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useParams } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/useHttp";
import { getSingleQuote } from "../lib/api";

function QuotesDetails() {
  const params = useParams();
  const history = useHistory();
  const match = useRouteMatch();

  const { quoteId } = params;
  console.log(match.path);
  console.log(params.quoteId);

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

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

  if (!loadedQuote.text) {
    return <h1>No quote found</h1>;
  }

  const handleClick = () => {
    history.push("/quotes");
  };

  return (
    <>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />

      <div style={{ textAlign: "right" }}>
        <button className="btn" onClick={handleClick}>
          Back
        </button>
      </div>
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      {/* <div className="centered">
        <Link className="btn--flat" to={`/quotes/${params.quoteId}/comments`}>
          Load Comments
        </Link>
      </div> */}
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </>
  );
}

export default QuotesDetails;
