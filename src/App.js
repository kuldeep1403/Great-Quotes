import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AllQuotes from "./pages/AllQuotes";
import NewQuote from "./pages/NewQuote";
import Notfound from "./pages/Notfound";
import QuotesDetails from "./pages/QuotesDetails";

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" exact>
            <AllQuotes />
          </Route>
          <Route path="/quotes/:quoteId">
            <QuotesDetails />
          </Route>
          <Route path="/newquote">
            <NewQuote />
          </Route>
          {/* this route should come always last so that our route system matches all the route in our webpage*/}
          <Route path="*">
            <Notfound />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
