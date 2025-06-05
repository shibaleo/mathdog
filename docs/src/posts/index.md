---
layout: doc
title: Posts
description: All posts in this website
---

<ContentList :data="data" />

<HomeButton />

<script setup>
import { useData } from 'vitepress'
const { theme, page, frontmatter } = useData()
import HomeButton from '@components/HomeButton.vue'
import ContentList from '@components/ContentList.vue'
import { data } from './menu.data.ts'
</script>