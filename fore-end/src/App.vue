<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import "./assets/fonts/icons/iconfont.js";
</script>

<template>
  <header></header>
  <RouterView />
</template>

<style lang="scss" scoped>
#thumb {
  width: 2em;
  height: 2em;
  font-size: 18px;
}
.test {
  color: $primary-color;
  font-size: $size-12;
  text-decoration: underline dashed #123456 2px;
}
</style>
