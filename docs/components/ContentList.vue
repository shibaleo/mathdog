<template>
  <h1 :id="frontmatter.title">{{ frontmatter.title }}
    <a class="header-anchor" :href="`#${frontmatter.title}`" :aria-label="`Permalink to ${frontmatter.title}`">
          </a>
  </h1>
  <p v-if="page.description">{{ page.description }}</p>
  <div v-for="sections in data" :key="sections[0]?.text">
    <section v-for="category in sections" :key="category.text">
      <h2 :id="category.text">{{ category.text }}
        <a class="header-anchor" :href="`#${category.text}`" :aria-label="`Permalink to ${category.text}`">
          </a>
      </h2>
      <ul>
        <li v-for="item in category.items" :key="item.link">
          <a :href="item.link">{{ item.text }}</a>
        </li>
      </ul>
    </section>
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
