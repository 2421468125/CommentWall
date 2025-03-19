import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserId = defineStore("userId", () => {
  const userId = ref("");

  function setUserId(id: string) {
    userId.value = id;
  }
  return { userId, setUserId };
});
