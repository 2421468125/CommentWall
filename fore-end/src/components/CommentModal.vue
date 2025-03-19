<template>
  <transition name="modal-transition" mode="in-out">
    <div v-if="props.isModal" class="comment-modal">
      <div class="modal-head">
        <p>写留言</p>
        <svg class="icon" aria-hidden="true" @click="closeModal">
          <use xlink:href="#icon-lajitong"></use>
        </svg>
      </div>
      <div class="modal-body">
        <div class="color-hub">
          <div
            :class="[
              'color-block',
              { 'color-selected': colorSelected === index },
            ]"
            v-for="(c, index) in cardColor"
            :style="{ 'background-color': c }"
            @click="
              () => {
                changeCommentModalColor(index);
              }
            "
          ></div>
        </div>
        <textarea
          v-model="modalMessage"
          class="comment-textarea"
          maxlength="100"
          :style="{ 'background-color': commentModalColor }"
          placeholder="在这里写下你的留言..."
        ></textarea>
        <textarea
          v-model="modalName"
          class="comment-namearea"
          maxlength="10"
          :style="{ 'background-color': commentModalColor }"
          placeholder="这里签名"
        ></textarea>
        <p class="label-p">选择标签</p>
        <div class="color-hub">
          <div
            :class="[
              'label-block',
              { 'label-selected': labelSelected === index },
            ]"
            v-for="(value, index) in label['CW']"
            @click="
              () => {
                changelabelSelected(index);
              }
            "
          >
            {{ value }}
          </div>
        </div>
        <div class="announcement">
          <p class="announcement-label">免责声明</p>
          <p class="announcement-content">
            本站(树洞)仅提供朋友间私自交流使用,用户的言论不代表本站观点。 <br />
            用户使用树洞则默认您遵从以下规定：<br />
            1.用户在自己的私人树洞发布自己的言论,与本平台立场无关.严禁将私人树洞公开给陌生人查阅；
          </p>
        </div>
      </div>
      <div class="modal-foot">
        <Button
          class="modal-button"
          label="丢弃"
          severity="secondary"
          @click="closeModal"
          rounded
        />
        <Button
          class="modal-button"
          label="提交"
          @click="submitComment"
          rounded
        />
      </div>
      <div
        v-if="showSubmitAnime"
        class="popup animate__animated animate__fadeIn"
      >
        提交成功！
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { cardColor, label } from "@/utils/data";
import Button from "primevue/button";
import { getStandardDate } from "@/utils/utils";
import { storeToRefs } from "pinia";
import apiManager from "@/api/index";
import { useUserId } from "@/stores/userId";

const commentModalColor = ref(cardColor[0]);
const colorSelected = ref(0);
const labelSelected = ref(0);
const modalMessage = ref("");
const modalName = ref("");
const showSubmitAnime = ref(false);
const { userId } = storeToRefs(useUserId());

const props = defineProps({
  isModal: {
    default: false,
  },
});

const emits = defineEmits(["close", "update"]);

function closeModal() {
  emits("close");
}

function initModal() {
  commentModalColor.value = cardColor[0];
  colorSelected.value = 0;
  labelSelected.value = 0;
  modalMessage.value = "";
  modalName.value = "";
}

async function submitComment() {
  console.log("submit");
  if (modalMessage.value.length === 0) {
    alert("信息不能为空");
    return;
  }
  const data = {
    type: 0,
    message: modalMessage.value,
    name: modalName.value.length ? modalName.value : "匿名",
    userId: userId.value,
    moment: getStandardDate(new Date()),
    label: labelSelected.value,
    color: colorSelected.value,
    imgurl: "",
  };
  apiManager
    .insertWallApi(data)
    .then((response) => {
      showSubmitAnime.value = true;
      setTimeout(() => {
        showSubmitAnime.value = false;
        initModal();
        closeModal();
        emits("update");
      }, 2000);
    })
    .catch((error) => {
      console.log("失败", error);
    });
}

function changeCommentModalColor(index: number) {
  commentModalColor.value = cardColor[index];
  colorSelected.value = index;
}

function changelabelSelected(index: number) {
  labelSelected.value = index;
}
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

    svg {
      border-radius: 25% 25% 25% 25%;
      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        cursor: pointer;
      }
    }
  }
  .modal-body {
    margin-top: 20px;
    height: auto;
    overflow-y: auto;
    display: flex;
    flex-direction: column;

    .color-hub {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(30px, 1fr));
      gap: 15px;
      padding: 20px;
      .color-block {
        width: 30px;
        height: 30px;
        &:hover {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          transform: translateY(-2px);
          cursor: pointer;
        }
      }
      .color-selected {
        border: 2px solid $primary-color;
      }
      .label-selected {
        background-color: #ddd;
      }
      .label-block {
        width: 45px;
        height: 30px;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          transform: translateY(-2px);
          cursor: pointer;
        }
      }
    }
    &:-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
    .comment-textarea {
      width: 100%;
      height: 150px;
      padding: 10px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-bottom: 0;
      border-radius: 10px 10px 0 0;
      overflow-y: auto;
      resize: none;
      &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: rgba(0, 0, 255, 1);
      }
    }
    .comment-namearea {
      width: 100%;
      height: 30px;
      padding: 0 10px 20px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-top: 0;
      border-radius: 0 0 10px 10px;
      overflow-y: hidden;
      resize: none;
      line-height: 20px;
    }
    .label-p {
      padding: 10px 10px 0;
      font-size: $size-16;
      color: $gray-0;
      font-weight: 600;
    }
    .announcement {
      width: 100%;
      height: fit-content;
      .announcement-label {
        padding: 10px 10px 0;
        font-size: $size-16;
        color: $gray-0;
        font-weight: 600;
      }
      .announcement-content {
        padding: 20px;
        font-size: $size-12;
        color: $gray-1;
        line-height: 2;
      }
    }
  }
  .modal-foot {
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: space-between;

    .modal-button {
      width: 40%;
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
}
.modal-transition-leave-to,
.modal-transition-enter-from {
  transform: translateX(100%);
}
.modal-transition-enter-active,
.modal-transition-leave-active {
  transition: transform 0.5s ease-in-out;
}
</style>
