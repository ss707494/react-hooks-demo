import ApolloClient from 'apollo-boost'
import { getToken } from '@/common/token'
import history from '@/common/history'
import { showMessage } from '@/component/Message'

const request = (operation) => {
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
      showMessage({message: '请重新登录'})
      history.push('login')
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

export default {
  client
}
