<template>
  <transition name="modal-transition" mode="in-out">
    <div v-if="props.isDetail" class="comment-modal" @scroll="handleScroll">
      <div class="modal-head">
        <p
          class="contact"
          @click="
            () => {
              confirm('是否确定');
            }
          "
        >
          {{ "不喜欢 " + props.cardProps.cardReport }}
        </p>
        <p
          class="revoke"
          @click="
            () => {
              confirm('是否举报');
            }
          "
        >
          {{ "举报 " + props.cardProps.cardInvoke }}
        </p>
        <svg class="icon" aria-hidden="true" @click="closeDetail">
          <use xlink:href="#icon-lajitong"></use>
        </svg>
      </div>
      <NodeCard :card-props="props.cardProps" />
      <div class="form-div">
        <div class="form">
          <textarea
            v-model="commentMessage"
            class="comment-textarea"
            maxlength="100"
            placeholder="评论"
          ></textarea>
          <IftaLabel>
            <InputText id="sign" v-model="commentuserName" />
            <label for="sign">签名</label>
          </IftaLabel>
          <Button
            type="submit"
            label="提交"
            severity="info"
            class="form-submit"
            @click="handleSubmit"
          />
        </div>
      </div>
      <div class="comments">
        <p style="font-size: 16; font-weight: 600; margin-bottom: 10px">
          {{ "评论: " + props.cardProps.cardComments }}
        </p>
        <CommentItem
          v-for="(value, index) in commentArray"
          :key="value.id"
          :commentProps="getCommentProps(value)"
        />
      </div>
      <div v-show="isLoading" class="loading">
        <div id="lottie-loading-comment"></div>
        <p>加载中...</p>
      </div>
      <div v-show="!allowLoading && !isLoading" class="last-line">
        <p>没有更多了</p>
      </div>
    </div>
  </transition>
  <div v-if="showSubmitAnime" class="popup animate__animated animate__fadeIn">
    评论成功！
  </div>
  <ConfirmDialog
    v-if="isDialog"
    :message="confirmMessage"
    @confirm="confirmCallBack"
    @cancel="cancelCallBack"
  />
</template>
<script setup lang="ts">
import { ref, onUpdated, onMounted, registerRuntimeCompiler } from "vue";
import { storeToRefs } from "pinia";
import NodeCard from "./NodeCard.vue";
import CommentItem from "./CommentItem.vue";
import ConfirmDialog from "./ConfirmDialog.vue";
import { useUserId } from "@/stores/userId";
import { getStandardDate } from "@/utils/utils";
import apiManager from "@/api/index";
import { IftaLabel, InputText, Button } from "primevue";
import lottie, { type RendererType } from "lottie-web";
import loadingAnimation from "@/assets/anime/loading.json";
const { userId } = storeToRefs(useUserId());
const confirmMessage = ref("");
const isDialog = ref(false);
const commentMessage = ref("");
const commentuserName = ref("");
const commentArray = ref(Array<{}>(0));
const commentPage = ref(1);
const showSubmitAnime = ref(false);
const allowLoading = ref(false);
const isLoading = ref(false);
const commentPagesize = 4;

function confirm(msg: string) {
  confirmMessage.value = msg;
  isDialog.value = true;
}

function getCommentProps(value: any) {
  return {
    commentImgurl: value.imgurl,
    commentMessage: value.comment,
    commentMoment: value.moment,
    commentName: value.name,
    commentUser: value.userId,
  };
}

function confirmCallBack() {
  const wallId = props.cardProps.cardId;
  const time = getStandardDate(new Date());
  const type = confirmMessage.value === "是否举报" ? 2 : 1;
  apiManager.insertFeedbackApi({
    wallId,
    userId: userId.value,
    type,
    moment: time,
  });
  isDialog.value = false;
}

function cancelCallBack() {
  isDialog.value = false;
}

function handleSubmit() {
  if (!commentMessage.value) {
    alert("评论不能为空");
    return;
  }
  let data = {
    wallId: props.cardProps.cardId,
    userId: userId.value,
    imgurl: "",
    comment: commentMessage.value,
    name: commentuserName.value ? commentuserName.value : "匿名",
    moment: getStandardDate(new Date()),
  };
  apiManager.insertCommentApi(data);
  showSubmitAnime.value = true;
  setTimeout(() => {
    commentuserName.value = "";
    commentMessage.value = "";
    emits("addComment");
    showSubmitAnime.value = false;
  }, 1500);
}

async function getComment(p: number) {
  if (!allowLoading.value) return;
  isLoading.value = true;
  let data = {
    page: p,
    pagesize: commentPagesize,
    wallId: props.cardProps.cardId,
  };
  const response = await apiManager.queryCommentPageApi(data);
  if (p === 1) commentArray.value = response.message;
  else commentArray.value = [...commentArray.value, ...response.message];
  if (response.message.length === 0) {
    allowLoading.value = false;
  }

  isLoading.value = false;
}

function changeCommentPage(page: number) {
  commentPage.value = page;
  if (page === 1) allowLoading.value = true;
}

function handleScroll(event: Event) {
  const element = event.target as HTMLElement;
  if (element.scrollHeight - element.scrollTop <= 1 + element.clientHeight) {
    getComment(commentPage.value + 1);
    changeCommentPage(commentPage.value + 1);
  }
}

const props = defineProps({
  isDetail: { default: true },
  cardProps: {
    default: {
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
    },
  },
});

const emits = defineEmits(["closeDetail", "addComment"]);

function closeDetail() {
  emits("closeDetail");
}

async function loadingAnime() {
  let params = {
    container: document.getElementById("lottie-loading-comment")!,
    renderer: "svg" as RendererType,
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
  };
  lottie.loadAnimation(params);
}
onMounted(() => {
  loadingAnime();
});
onUpdated(() => {
  getComment(1);
});
</script>
<style lang="scss" scoped>
.comment-modal {
  width: 360px;
  height: 100%;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 9998;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
  padding: 62px 20px 20px 20px;
  box-sizing: border-box;
  overflow-y: auto;
  .modal-head {
    font-size: $size-16;
    color: $gray-0;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .contact {
      color: $primary-color;
      cursor: pointer;
    }
    .revoke {
      color: $error-color;
      cursor: pointer;
    }
    svg {
      border-radius: 25% 25% 25% 25%;
      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        cursor: pointer;
      }
    }
  }
  .form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    .comment-textarea {
      width: 288px;
      height: 150px;
      padding: 10px;
      padding-left: 0;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 10px;
      overflow-y: auto;
      resize: none;
      margin-bottom: 10px;
      &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: rgba(0, 0, 255, 1);
      }
    }
    .form-submit {
      width: 100px;
      margin-top: 10px;
    }
  }

  .comments {
    margin-top: 20px;
    overflow-y: auto;
  }

  .loading {
    text-align: center;
    width: 100%;

    p {
      margin-top: -72px;
      font-size: 20px;
      color: $gray-1;
    }
    #lottie-loading-comment {
      margin-top: 20px;
      height: 160px;
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
.popup {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: $primary-color;
  color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 9999;
}
</style>
