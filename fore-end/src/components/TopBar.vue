<template>
  <div class="trigger-area" @mouseenter="showTopBar"></div>
  <transition name="top-bar-transition" mode="in-out">
    <div v-show="!isHidden" class="top-bar" @mouseleave="hideTopBar">
      <div class="logo">
        <img src="@/assets/images/Browser.png" class="logo-img" />
        <p class="logo-name">留言墙</p>
      </div>
      <div class="menu">
        <Button
          label="留言墙"
          :severity="nowPage === 'CW' ? 'info' : 'secondary'"
          @click="() => handleClick('CW')"
          rounded
        />
        <Button
          label="照片墙"
          :severity="nowPage === 'PW' ? 'info' : 'secondary'"
          @click="() => handleClick('PW')"
          rounded
        />
      </div>
      <div class="user">
        <div class="user-head"></div>
        <div class="user-id">
          {{ "您好，用户  " + userId }}
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import { ref, type Ref, onMounted, onUnmounted } from "vue";
import { usePageStore } from "@/stores/pageStore";
import { storeToRefs } from "pinia";
import { useUserId } from "@/stores/userId";

const store = usePageStore();
const { nowPage } = storeToRefs(store);
const { setPage } = store;
const isHidden = ref(false);
const { userId } = storeToRefs(useUserId());
function handleClick(page: String) {
  if (page === nowPage.value) return;
  if (nowPage.value == "CW") {
    setPage("PW");
  } else {
    setPage("CW");
  }
}

function showTopBar() {
  isHidden.value = false;
}

function hideTopBar() {
  isHidden.value = true;
}

function handleScroll() {
  if (window.scrollY === 0) {
    showTopBar();
  } else if (isHidden.value === false) {
    hideTopBar();
  }
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style lang="scss" scoped>
.trigger-area {
  width: 100%;
  height: 52px;
  background: transparent;
  z-index: 9998;
  position: fixed;
  top: 0;
  left: 0;
}

.top-bar {
  width: 100%;
  height: 52px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 0px 4px 0px $gray-0;
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 9999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 30px;
  .logo {
    display: flex;
    align-items: center;
    width: 300px;
    .logo-img {
      width: 50px;
      height: 50px;
      margin: 0 10px;
    }

    .logo-name {
      font-size: 25;
      color: $gray-0;
      font-weight: 600;
    }
  }
  .menu {
    width: 150px;
    display: flex;
    justify-content: space-between;
  }

  .user {
    width: 300px;
    display: flex;
    justify-content: start;
    align-items: center;
    .user-head {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      height: 36px;
      width: 36px;
      background-image: linear-gradient(180deg, #48d0da 50%, #b2f0f0);
    }
    .user-id {
      font-weight: 600;
      font-size: $size-14;
      padding-left: 20px;
    }
  }
}
.top-bar-transition-enter-from {
  transform: translateY(-100%);
}

.top-bar-transition-leave-to {
  transform: translateY(-100%);
}
.top-bar-transition-enter-active,
.top-bar-transition-leave-active {
  transition: transform 0.5s ease-in-out;
}
</style>
