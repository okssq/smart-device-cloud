<template>
  <div class="login-page row">
    <div class="col-sm-0 col-md-7 gt-xs banner">
      <q-img src="~assets/images/analytics.png" class="banner-img"/>
    </div>
    <div class="bg-white col-12 col-md-5 form">
      <div class="company-img">
        <img
          style="width: 140px"
          src="~assets/images/logo-white.jpg"
          alt="上海蚁探智能科技有限公司"
        />
      </div>
      <login-form />
    </div>
  </div>
</template>
<script setup>
import LoginForm from "./form.vue";
</script>
<style scoped>
.login-page {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.banner {
  background-color: rgb(243, 245, 253);
  display: flex;
  justify-content: center;
  align-items: center;
}

.banner-img {
  max-width: 70%;
  transition: all .3s;
  animation: 3s linear move infinite;
}

@keyframes move {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-4deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(6deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.company-img {
  position: absolute;
  right: 20px;
  top: 20px;
}
</style>
