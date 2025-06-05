<template>
  <h1>{{ frontmatter.title }}</h1>
  <div v-for="sections in data" :key="sections[0]?.text">
    <ul>
        <li v-for="category in sections" :key="category.link">
          <a :href="category.link">{{ category.text }}</a>
        </li>
      </ul>
  </div>
</template>

<script setup>
import { useData } from 'vitepress'

const { theme, page, frontmatter } = useData()
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>
