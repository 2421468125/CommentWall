<template>
  <div class="foot-bar">
    <div class="foot-bar-context">
      <div class="foot-bar-content-left" style="width: 300px">
        <div class="logo">
          <img src="@/assets/images/Browser.png" class="logo-img" />
          <p class="logo-name">留言墙</p>
        </div>
        <div class="license">
          <p>
            需要写点东西，我也不知道写什么，就写些废话占位了。反正也不会有人看。
          </p>
          <p>License: 沪xxxxx.xxxxx 未经本人授权，也可以随便转载。</p>
        </div>
      </div>
      <div class="foot-bar-content-middle" style="width: 300px">
        <p style="font-size: 16px">链接</p>
        <a href="#" @click.prevent="scrollToTop" style="font-size: 14px"
          >回到顶部</a
        >
      </div>
      <div class="foot-bar-content-right" style="width: 300px">
        <div class="qrcode">
          <p>打赏扫这里</p>
          <div class="qrcode-container">
            <img
              src="@/assets/images/lt.jpg"
              class="qrcode-img"
              style="margin-right: 10px"
            />
            <img src="@/assets/images/lt.jpg" class="qrcode-img" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
</script>
<style lang="scss" scoped>
.foot-bar {
  width: 100%;
  height: 200px;
  background-color: $gray-0;
  padding: 20px;
  margin-top: 50px;
  .foot-bar-context {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    p {
      color: $gray-2;
      font-size: $size-12;
    }
    .logo {
      display: flex;
      align-items: center;
      width: 150px;
      .logo-img {
        width: 50px;
        height: 50px;
        margin: 0 10px;
      }
      .logo-name {
        font-size: 20px;
        font-weight: 600;
      }
    }
    .license {
      margin-top: 20px;
      width: 400px;
      height: 80px;
      p {
        margin-bottom: 20px;
        margin-left: 50px;
      }
    }

    .qrcode-container {
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      margin-top: 10px;
      .qrcode-img {
        width: 140px;
        height: 140px;
      }
    }
  }
}
</style>
