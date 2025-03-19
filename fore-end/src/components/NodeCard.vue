<template>
  <div
    class="node-card"
    :style="{
      width: props.cardProps.cardWidth,
      backgroundColor: props.cardProps.cardColor,
    }"
  >
    <div class="card-top">
      <p class="card-time">{{ props.cardProps.cardDate }}</p>
      <p class="card-label">{{ props.cardProps.cardLabel }}</p>
    </div>
    <p class="card-message">{{ props.cardProps.cardMessage }}</p>
    <div class="card-foot">
      <div style="display: inline-flex">
        <svg
          :class="[
            'icon',
            'like',
            { 'is-like': props.cardProps.cardIsLike === 1 },
          ]"
          aria-hidden="true"
          @click.stop="onClickLike"
        >
          <use xlink:href="#icon-zhangdan"></use>
        </svg>
        <p class="thumb-number">{{ props.cardProps.cardLikes }}</p>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-huihua"></use>
        </svg>
        <p class="comment-number">{{ props.cardProps.cardComments }}</p>
      </div>

      <div class="card-user-name">
        <p>{{ props.cardProps.cardName }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "@/assets/fonts/icons/iconfont copy.js";
import { ref } from "vue";

const props = defineProps({
  cardProps: {
    type: Object,
    required: true,
    default: () => ({
      cardColor: "",
      cardComments: 0,
      cardDate: "",
      cardId: 0,
      cardInvoke: 0,
      cardIsLike: 0,
      cardLabel: "",
      cardLikes: 0,
      cardMessage: "",
      cardName: "",
      cardReport: 0,
      cardUser: 0,
      cardWidth: "288px",
    }),
  },
});

const emits = defineEmits(["like"]);

function onClickLike() {
  emits("like");
}
</script>

<style lang="scss" scoped>
.icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.15em;
  fill: $gray-1;
  overflow: hidden;
}

.node-card {
  height: 240px;
  padding: 10px 20px 16px;
  margin-top: 10px;
  box-sizing: border-box;
  position: relative;
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-top: 10px;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    padding-bottom: 16px;
    p {
      font-size: $size-12;
      color: $gray-2;
    }
  }
  .card-message {
    height: 140px;
    font-size: $size-14;
    color: $gray-0;
    cursor: pointer;
  }
  .card-foot {
    display: flex;
    justify-content: space-between;
    width: 100%;
    position: absolute;
    bottom: 16px;
    left: 0;
    padding: 0 20px;
    box-sizing: border-box;
    p {
      margin: 4px 6px 0;
    }

    .like {
      border-radius: 25% 25% 0 0;
      &:hover {
        cursor: pointer;
        transform: translateY(-2px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }
    }

    .is-like {
      fill: red;
    }
  }
}
</style>
