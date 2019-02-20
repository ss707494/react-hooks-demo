import ApolloClient from 'apollo-boost'

const request = (operation) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: localStorage.getItem('token') || '',
    }
  }));
}

export const client = new ApolloClient({
  // link,
  uri: "/api",
  request,
  // link: createHttpLink({ uri: "/sdfsf" }),
});

export default {
  client
}
