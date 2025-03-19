<template>
  <div class="comment-item">
    <div
      v-if="!props.commentProps.commentImgurl"
      class="user-portrait"
      :style="{ 'background-image': portrait }"
    ></div>
    <img
      v-if="props.commentProps.commentImgurl"
      :src="props.commentProps.commentImgurl"
      class="user-portrait"
    />
    <div class="user-body">
      <div class="user-head">
        <p class="user-name">{{ props.commentProps.commentName }}</p>
        <p class="user-moment">{{ props.commentProps.commentMoment }}</p>
      </div>
      <p class="user-comment">{{ props.commentProps.commentMessage }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { portraitColor } from "@/utils/data";
import { onMounted, ref } from "vue";

const portrait = ref("");
const props = defineProps({
  commentProps: {
    default: {
      commentImgurl: "",
      commentMessage: "",
      commentMoment: "",
      commentName: "",
      commentUser: 0,
    },
  },
});

onMounted(() => {
  if (!props.commentProps.commentImgurl) {
    const index = Math.floor(Math.random() * 11);
    portrait.value = portraitColor[index];
  }
});
</script>
<style lang="scss" scoped>
.comment-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  .user-portrait {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    height: 36px;
    width: 36px;
  }
  .user-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    .user-head {
      display: flex;
      justify-content: space-between;
      .user-name {
        font-weight: 600;
        font-size: 16px;
      }
      .user-moment {
        font-size: 14px;
        color: $gray-1;
      }
    }

    .user-comment {
      width: 238px;
      margin-top: 5px;
      font-size: 14px;
      height: auto;
      white-space: pre-wrap;
      word-break: break-all;
    }
  }
}
</style>
