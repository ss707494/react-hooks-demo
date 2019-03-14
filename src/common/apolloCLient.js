import React from 'react'
import ApolloClient from './apploClientBoost'
import { ApolloProvider } from 'react-apollo'
import { getToken, setToken } from '@/common/token'
import history from '@/common/history'
import { showMessage } from '@/component/Message'

export let client

export const wrapperApollo = (el) => {

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
        refresh_token: getToken('refresh_token'),
      }
    }));
  }

  const response = (res, operation) => {
    const { response: { headers } } = operation.getContext();
    if (headers.has('refreshToken')) {
      const { token, refreshToken } = JSON.parse(headers.get('refreshToken'))
      setToken(token)
      setToken(refreshToken, 'refresh_token')
    }
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

  client = new ApolloClient({
    // link,
    uri: "/api",
    request,
    onError,
    response,
    // link: createHttpLink({ uri: "/sdfsf" }),
  });

  return (
      <ApolloProvider client={client}>
        {el}
      </ApolloProvider>
  )
}

export default {
  client,
  wrapperApollo,
}
