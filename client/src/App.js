import React, { Component } from "react";
import FormContainer from "./components/FormContainer";
import FeedbackButton from "./components/FeedbackButton";
import { Query } from "react-apollo";
import { GET_NEW_QUERY } from "./gql";

class App extends Component {
  render() {
    return (
      <div className="App">
<<<<<<< HEAD
        <FormContainer />
        <FeedbackButton />
=======
      <FormContainer />
      <FeedbackButton />
      <Query
        query={GET_TEST}
        // skip={props.username === ``}
        variables={{ username: 'reinoptland' }}
      >
        {({ loading, error, data }) => {
          console.log(data)
          return null
          // if (loading) return <Loader />;

          // if (error)
          //   return (
          //     <div className="errorBox">
          //       <p>Please submit valid username </p>
          //     </div>
          //   );
>>>>>>> 866a2e52c705e2e6451dedd586a9220eede1b7e4

        <Query
          // New query
          query={GET_NEW_QUERY}
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
