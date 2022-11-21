<template>
  <div class="loading-wrap">
    <div class="hex-wrap">
      <div class="hex"></div>
      <div class="hex"></div>
      <div class="hex"></div>
      <div class="hex"></div>
      <div class="hex"></div>
      <div class="hex"></div>
      <div class="hex"></div>
    </div>
    <p class="loading-txt">正在加载网站数据，请稍等。</p>
  </div>
</template>

<script>

</script>

<style scoped>
.loading-wrap {
  z-index: 300;
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 180px rgb(0 0 0 / 10%);;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
}
.hex-wrap {
  width: 100px;
  height: 100px;
  position: relative;
  border-radius: 50%;
  animation: fadeIn 2s 1;
  margin-top: -5%;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}
.hex {
  position: absolute;
  border-radius: 4px;
  width: 30px;
  height: 20px;
  background-color: #169fff;
  animation: fade 1.5s infinite ease;
  box-shadow: 0 0 20px #fff, 0 0 20px #fff;
  opacity: 0.9;
}
.loading-txt {
  text-align: center;
  margin-top: 20px;
  font-size: 2em;
  color:#169fff;
}
.hex:nth-child(1) {
  top: 10px;
  left: 17px;
  animation-delay: 0.1s;
}

.hex:nth-child(2) {
  top: 10px;
  left: 51px;
  animation-delay: 0.2s;
}

.hex:nth-child(3) {
  top: 40px;
  left: 70px;
  animation-delay: 0.3s;
}

.hex:nth-child(4) {
  top: 70px;
  left: 51px;
  animation-delay: 0.4s;
}

.hex:nth-child(5) {
  top: 70px;
  left: 17px;
  animation-delay: 0.5s;
}

.hex:nth-child(6) {
  top: 40px;
  left: 0;
  animation-delay: 0.6s;
}

.hex:nth-child(7) {
  top: 40px;
  left: 35px;
  animation-delay: 0.7s;
}

.hex:nth-child(8) {
  top: 10px;
  left: 17px;
  animation-delay: 0.1s;
}



@keyframes fade {
  0% {
    opacity: 0.5;
    transform: scale(1);
  }
  7% {
    opacity: 0;
    transform: scale(0.2);
  }
  42% {
    opacity: 0;
    transform: scale(0.2);
  }
  49% {
    opacity: 0.5;
    transform: scale(1);
  }
  100% {
    opacity: 0.5;
    transform: scale(1);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}


</style>
