<template>
  <div class="wall-message">
    <p class="title">{{ currentWallType.name }}</p>
    <p class="slogan">{{ currentWallType.slogan }}</p>
    <div class="page-label">
      <p
        :class="['label-list', { 'label-selected': selectedId === -1 }]"
        @click="() => changeSelected(-1)"
      >
        全部
      </p>
      <p
        :class="['label-list', { 'label-selected': selectedId === index }]"
        @click="() => changeSelected(index)"
        v-for="(e, index) in currentLabelType"
        :key="index"
      >
        {{ e }}
      </p>
    </div>
    <div class="comment-card">
      <NodeCard
        v-for="(value, index) in currentNodeCard"
        :key="value.id"
        :card-props="getCardProps(value)"
        @click="() => showCardDetail(value)"
        @like="
          () => {
            handleLike(index);
          }
        "
      />
      <div v-if="currentNodeCard.length === 0" class="no-comment-message">
        <p>还没有留言哦，快贴上第一张吧！</p>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-tansuo"></use>
        </svg>
      </div>
    </div>
    <div v-show="isLoading" class="loading">
      <div id="lottie-loading"></div>
      <p>加载中...</p>
    </div>
    <div v-if="!isLoading" class="last-line">
      <div v-show="!allowLoading">
        <p>没有更多了</p>
      </div>
      <p>我可是有底线的</p>
    </div>
  </div>
  <CommentModal @close="changeModal" @update="update" :is-modal="modalOpen" />
  <CardDetail
    :card-props="cardDetailProps"
    :is-detail="detailOpen"
    @closeDetail="closeDetail"
    @addComment="
      () => {
        addComment(cardDetailProps.cardId);
      }
    "
  />
  <div
    class="add-icon"
    @mouseleave="handleIconLeave"
    @mouseenter="handleIconEnter"
  >
    <svg
      :class="['icon', { 'icon-hidden': iconHidden, 'icon-show': !iconHidden }]"
      @click="changeModal"
      aria-hidden="true"
    >
      <use xlink:href="#icon-xiaoxi"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { wallType, label, cardColor } from "@/utils/data";
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { usePageStore } from "@/stores/pageStore";
import { useUserId } from "@/stores/userId";
import { storeToRefs } from "pinia";
import lottie, { type RendererType } from "lottie-web";
import loadingAnimation from "@/assets/anime/loading.json";
import NodeCard from "@/components/NodeCard.vue";
import CommentModal from "@/components/CommentModal.vue";
import CardDetail from "@/components/CardDetail.vue";
import apiManager from "@/api/index";
import { getStandardDate } from "@/utils/utils";

const store = usePageStore();
const { nowPage } = storeToRefs(store);
const { setPage } = store;
const { userId } = storeToRefs(useUserId());
const selectedId = ref(-1);
const iconHidden = ref(false);
const modalOpen = ref(false);
const detailOpen = ref(false);
const cardDetailProps = ref({});
const isLoading = ref(false);
const page = ref(1);
const pagesize = ref(12);
const note = ref(Array<{}>(0));
const allowLoading = ref(true);

const currentWallType = computed(() => wallType[nowPage.value]);
const currentLabelType = computed(() => label[nowPage.value]);
const currentNodeCard = computed(() => {
  const res = note.value.filter((v: any) => {
    if (nowPage.value === "PW") return false;
    return v.label === selectedId.value || selectedId.value === -1;
  });
  return res;
});

async function getWallCard(p: number) {
  isLoading.value = true;
  let data = {
    type: nowPage.value === "CW" ? 0 : 1,
    page: p,
    pagesize: pagesize.value,
    label: selectedId.value,
    userId: userId.value,
  };
  const response = await apiManager.queryWallPageApi(data);
  if (p === 1) note.value = response.message;
  else note.value = [...note.value, ...response.message];
  if (response.message.length === 0) {
    allowLoading.value = false;
  }

  isLoading.value = false;
}

function update() {
  changePage(1);
  document.documentElement.scrollTop = 0;
  getWallCard(1);
}

function changeSelected(index: number) {
  selectedId.value = index;
}

function changePage(p: number) {
  page.value = p;
  if (p === 1) {
    allowLoading.value = true;
  }
}

function handleIconLeave() {
  iconHidden.value = true;
}

function handleIconEnter() {
  iconHidden.value = false;
}

function handleLike(index: number) {
  const wallId = note.value[index].id;
  const time = getStandardDate(new Date());
  if (note.value[index].isLike) {
    note.value[index].like--;
    note.value[index].isLike = 0;
    apiManager.deleteFeedbackApi({ wallId });
  } else {
    note.value[index].like++;
    note.value[index].isLike = 1;

    apiManager.insertFeedbackApi({
      wallId,
      userId: userId.value,
      type: 0,
      moment: time,
    });
  }
}

function getCardProps(value: any) {
  return {
    cardColor: cardColor[value.color],
    cardComments: value.commentCount,
    cardDate: value.moment,
    cardId: value.id,
    cardInvoke: value.invoke,
    cardIsLike: value.isLike,
    cardLabel: currentLabelType[value.label],
    cardLikes: value.like,
    cardMessage: value.message,
    cardName: value.name,
    cardReport: value.report,
    cardUser: value.userId,
    cardWidth: "288px",
  };
}
function changeModal() {
  modalOpen.value = !modalOpen.value;
  if (modalOpen.value) closeDetail();
}

function showCardDetail(value: Object) {
  if (modalOpen.value) modalOpen.value = false;
  if (!detailOpen.value) detailOpen.value = true;
  cardDetailProps.value = getCardProps(value);
}

function closeDetail() {
  detailOpen.value = false;
}

function addComment(id: number) {
  note.value.forEach((v, i) => {
    if (v.id === id) {
      note.value[i].commentCount++;
      closeDetail();
      return;
    }
  });
}

async function loadingAnime() {
  let params = {
    container: document.getElementById("lottie-loading")!,
    renderer: "svg" as RendererType,
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
  };
  lottie.loadAnimation(params);
}

function handleScroll() {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //距离顶部
  let clientHeight = document.documentElement.clientHeight; //页面高度
  let scrollHeight = document.documentElement.scrollHeight; //网页总高
  if (scrollTop + clientHeight + 200 >= scrollHeight) {
    const btn = document.querySelector(".add-icon") as HTMLElement;
    if (btn) {
      btn.style.bottom = `${scrollTop + clientHeight + 252 - scrollHeight}px`;
    }
  }
  //加载更多
  if (scrollTop + clientHeight + 1 >= scrollHeight && allowLoading.value) {
    getWallCard(page.value + 1);
    changePage(page.value + 1);
  }
}

watch(userId, (newVal, oldVal) => {
  getWallCard(page.value);
});

onMounted(() => {
  loadingAnime();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

watch(nowPage, (newVal, oldVal) => {
  selectedId.value = -1;
});
</script>
<style lang="scss" scoped>
.wall-message {
  min-height: 700px;
  padding-top: 52px;
  display: flex;
  align-items: center;
  flex-direction: column;
  .title {
    font-size: 56px;
    color: $gray-0;
    text-align: center;
    font-weight: 600;
    padding-top: 48px;
    padding-bottom: 8px;
  }
  .slogan {
    color: $gray-1;
    text-align: center;
    padding-bottom: 18px;
  }
  .page-label {
    display: flex;
    justify-content: center;
    margin: 40px 5px 0 0;
    .label-list {
      padding: 2px 14px;
      line-height: 20px;
      margin: 4;
      color: $gray-2;
      cursor: pointer;
      border-radius: 16px;
      border: 1px solid transparent;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
    }
    .label-selected {
      border: 1px solid $gray-1;
      font-weight: 600;
    }
  }

  .comment-card {
    width: 90%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(288px, 1fr));
    gap: 16px;
    justify-content: space-around;
    .no-comment-message {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 200px;
      p {
        font-size: 24px;
        color: $gray-1;
        font-weight: 400;
      }
      svg {
        margin-top: 30px;
        fill: $primary-color;
        width: 3em;
        height: 3em;
      }
    }
  }
  .loading {
    text-align: center;
    width: 100%;

    p {
      margin-top: -72px;
      font-size: 24px;
      color: $gray-1;
    }
    #lottie-loading {
      margin-top: 20px;
      height: 200px;
    }
  }

  .last-line {
    width: 100%;
    margin-top: 20px;
    border-bottom: 2px solid #eee;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p {
      font-size: 14px;
      color: $gray-2;
      margin-bottom: 10px;
    }
  }
}
.add-icon {
  height: 42px;
  width: 94px;
  position: fixed;
  bottom: 52px;
  right: 0px;

  .icon {
    aspect-ratio: 1;
    width: 42px;
    height: 100%;
    fill: $gray-0;
    border-radius: 50% 10% 50% 50%;
    &:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
  }
  .icon-hidden {
    transform: translateX(100%);
    transition: transform 0.5s ease-in-out;
  }
  .icon-show {
    transform: translateX(0);
    transition: transform 0.5s ease-in-out;
  }
}
</style>
