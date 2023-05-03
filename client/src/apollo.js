import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { useQuery, useMutation } from '@vue/apollo-composable';
import Vue from 'vue';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql', // replace with your GraphQL endpoint URL
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message }) => {
      Vue.notify({
        title: 'GraphQL Error',
        text: message,
        type: 'error',
      });
    });

  if (networkError)
    Vue.notify({
      title: 'Network Error',
      text: networkError.message,
      type: 'error',
    });
});

const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export { apolloClient, useQuery, useMutation };
