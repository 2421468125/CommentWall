<template>
  <div class="confirm-dialog-overlay">
    <div class="confirm-dialog">
      <p>{{ props.message }}</p>
      <Button class="btn" severity="info" @click="confirm" rounded>确认</Button>
      <Button class="btn" severity="secondary" @click="cancel" rounded
        >取消</Button
      >
    </div>
  </div>
  <div v-if="showSubmitAnime" class="popup animate__animated animate__fadeIn">
    提交成功！
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";

const showSubmitAnime = ref(false);
const props = defineProps({
  message: { type: String, default: "是否确认？" },
});

const emits = defineEmits(["confirm", "cancel"]);

async function confirm() {
  showSubmitAnime.value = true;
  setTimeout(() => {
    showSubmitAnime.value = false;
    emits("confirm");
  }, 1000);
}

const cancel = () => {
  emits("cancel");
};
</script>
<style lang="scss" scoped>
.confirm-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.confirm-dialog {
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;

  .btn {
    margin: 10px;
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
