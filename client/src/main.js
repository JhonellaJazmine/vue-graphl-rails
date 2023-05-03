import { createApp } from 'vue'
import App from './App.vue'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { createHttpLink } from '@apollo/client/link/http'
import { DefaultApolloClient } from '@vue/apollo-composable'

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql', // Replace with your GraphQL endpoint
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

const app = createApp(App)

app.provide(DefaultApolloClient, apolloClient)

app.config.globalProperties.$apollo = apolloClient // make apollo client available to all components


app.mount('#app')
