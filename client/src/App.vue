<script setup>
  import { useQuery } from '@vue/apollo-composable';
  import gql from 'graphql-tag';
  import{ watchEffect, computed } from 'vue';
  import Posts from './components/Posts.vue'

  const ALL_POSTS_QUERY = gql`
    query {
      allPosts {
        id
        title
        body
      }
    }
  `;

  const { result } = useQuery(ALL_POSTS_QUERY);
  const posts = computed(() =>  result.value?.allPosts ?? []);


watchEffect(() => {
  console.log(posts);
});

</script>

<template>
  <div>
    <Posts />
    <h1> POSTS FROM GRAPHQL</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
    </ul>
  </div>
</template>

<style scoped>
  
</style>
