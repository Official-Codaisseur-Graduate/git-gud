import React, { Component } from "react";
import FormContainer from "./components/FormContainer";
import FeedbackButton from "./components/FeedbackButton";
import { Query } from "react-apollo";
import { GET_NEW_QUERY } from "./gql";

class App extends Component {
  render() {
    return (
      <div className="App">
        <FormContainer />
        <FeedbackButton />

        <Query
          // New query
          query={GET_NEW_QUERY}
          variables={{ username: "reinoptland" }}
        >
          {({ loading, error, data }) => {
            console.log("GET NEW QUERY RESULT: ", data);
            return null;
          }}
        </Query>
      </div>
    );
  }
}

export default App;
