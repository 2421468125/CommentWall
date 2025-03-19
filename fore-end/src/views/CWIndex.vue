<template>
  <div class="wall-index">
    <TopBar></TopBar>
    <router-view></router-view>
    <FootBar></FootBar>
  </div>
</template>

<script setup>
import TopBar from "@/components/TopBar.vue";
import FootBar from "@/components/FootBar.vue";
import WallMessage from "./WallMessage.vue";
import apiManager from "@/api/index";
import { useUserId } from "@/stores/userId";
const { userId, setUserId } = useUserId();
apiManager.signIpApi().then((res) => setUserId(String(res.ip)));
</script>

<style lang="scss" scoped>
.wall-index {
  height: 100vh;
}
</style>
