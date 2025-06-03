<template>
  <Layout>
    <!-- Hero セクションの後 -->
    <template #home-hero-after>
      <slot name="home-hero-after" />
    </template>
    
    <!-- Features セクションの後 -->
    <template #home-features-after>
      <slot name="home-features-after" />
      
      <!-- カスタムコンテンツエリア -->
      <div v-if="$slots.content" class="custom-content">
        <slot name="content" />
      </div>
    </template>
    
    <!-- ページの最後にHomeButton -->
    <template #layout-bottom>
      <div v-if="showHomeButton" class="home-button-section">
        <div class="container">
          <HomeButton 
            :text="homeButtonText"
            :to="homeButtonLink"
          />
        </div>
      </div>
      <slot name="layout-bottom" />
    </template>
  </Layout>
</template>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import Layout from 'vitepress/theme'
import HomeButton from '../components/HomeButton.vue'

const { frontmatter } = useData()

// frontmatterから設定を読み取り
const showHomeButton = computed(() => {
  return frontmatter.value.showHomeButton !== false // デフォルトでtrue
})

const homeButtonText = computed(() => {
  return frontmatter.value.homeButtonText || 'Take me home'
})

const homeButtonLink = computed(() => {
  return frontmatter.value.homeButtonLink || '/'
})
</script>

<style scoped>
.custom-content {
  max-width: 1152px;
  margin: 0 auto;
  padding: 64px 24px;
}

.home-button-section {
  background-color: var(--vp-c-bg-alt);
  border-top: 1px solid var(--vp-c-divider);
  padding: 48px 0;
}

.container {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px;
}

@media (max-width: 768px) {
  .custom-content,
  .home-button-section {
    padding: 32px 16px;
  }
}
</style>