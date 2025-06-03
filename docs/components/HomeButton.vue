<!-- .vitepress/components/HomeButton.vue -->
<template>
  <div class="home-button-container">
    <a class="link" href="/" aria-label="go to index">
      Take me home
    </a>
  </div>
</template>

<style scoped>
.home-button-container {
  padding: 16px 0;
  text-align: center;
}

.link {
  display: inline-block;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 16px;
  padding: 3px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  transition: border-color 0.25s, color 0.25s;
  text-decoration: none;
}

.link:hover {
  border-color: var(--vp-c-brand-2);
  color: var(--vp-c-brand-2);
}
</style>