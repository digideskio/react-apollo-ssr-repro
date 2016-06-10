import React from 'react';
import ReactDOM from 'react-dom/server';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { connect, ApolloProvider } from 'react-apollo';

// Globally register gql template literal tag
import { registerGqlTag } from 'apollo-client/gql';
registerGqlTag();

const client = new ApolloClient({
  networkInterface: createNetworkInterface('https://www.graphqlhub.com/playground')
});

const Element = (props) => {
  return <div>foo {props.loading}</div>;
}

const WrappedElement = connect({
  mapQueriesToProps: ({ ownProps }) => ({
    data: {
      query: gql`
        query Feed {
          currentUser {
            login
          }
        }
      `
    }
  })
})(Element);

const component = (
  <ApolloProvider client={client}>
    <WrappedElement />
  </ApolloProvider>
);

console.log(ReactDOM.renderToString(component));
