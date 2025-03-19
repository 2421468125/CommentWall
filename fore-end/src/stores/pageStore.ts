import { defineStore } from "pinia";
import { ref } from "vue";

export const usePageStore = defineStore("page", () => {
  const nowPage = ref("CW");

  function setPage(page: string) {
    nowPage.value = page;
  }
  return { nowPage, setPage };
});
