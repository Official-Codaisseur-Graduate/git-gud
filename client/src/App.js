import React, { Component } from "react";
import FormContainer from "./components/FormContainer";
import FeedbackButton from "./components/FeedbackButton";
import { GET_USER_DATA, GET_TEST } from "./gql";
import { Query } from "react-apollo";

class App extends Component {
  render() {
    return (
      <div className="App">
        <FormContainer />
        <FeedbackButton />
        {/* 
      Newly added: below the GET_TEST query that is defined in gql.js.
      The server result we are getting is captured trough the data parameter.
      This result is usable to use in the front-end.
      */}
        <Query query={GET_TEST} variables={{ username: "reinoptland" }}>
          {({ loading, error, data }) => {
            console.log(data);
            return null;
          }}
        </Query>
      </div>
    );
  }
}

export default App;
