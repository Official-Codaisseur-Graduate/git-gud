import React, { Component } from 'react';
import FormContainer from './components/FormContainer';
import FeedbackButton from './components/FeedbackButton';
import { GET_USER_DATA, GET_TEST } from './gql'
import { Query } from "react-apollo";

class App extends Component {
  componentDidMount(){
    // Where do we fetch? Welke url? 
    // Kijken waar nu iets fetched, en dan hetzelfde doen 

  }

  render() {
    return (
      <div className="App">
      <FormContainer />
      <FeedbackButton />
      <Query
        query={GET_TEST}
        // skip={props.username === ``}
        variables={{ username: 'AidaRos95' }}
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

          // return <div> {data && <ProfileStats user={data.user} />}</div>;
        }}
      </Query>
      </div>
    );
  }
}

export default App;
