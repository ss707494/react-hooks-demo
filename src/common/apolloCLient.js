import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { getToken } from '@/common/token'
import history from '@/common/history'
import { showMessage } from '@/component/Message'

const omitTypename = (key, value) => {
  return key === '__typename' ? undefined : value
}

const request = (operation) => {
  if (operation.variables) {
    operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename)
  }
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: getToken(),
    }
  }));
}

const onError = ({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
        console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
    );

  if (networkError) {
    console.log(`[Network error]: ${networkError.bodyText}`);
    if (networkError.statusCode === 401) {
      showMessage({ message: '请重新登录' })
      history.push('/login')
    }
  }
}

export const client = new ApolloClient({
  // link,
  uri: "/api",
  request,
  onError,
  // link: createHttpLink({ uri: "/sdfsf" }),
});

export const wrapperApollo = (el) => (
    <ApolloProvider client={client} >
      {el}
    </ApolloProvider>
)

export default {
  client,
  wrapperApollo,
}
