<template>
  <div class="guide-container">
    <div class="swiper-container">
      <div class="swiper-slide" v-show="currentIndex === 0">
        <img src="/step1.jpg" alt="步骤1" class="slide-img">
      </div>
      <div class="swiper-slide" v-show="currentIndex === 1">
        <img src="/step2.jpg" alt="步骤2" class="slide-img">
      </div>
      <div class="swiper-slide" v-show="currentIndex === 2">
        <img src="/step3.jpg" alt="步骤3" class="slide-img">
      </div>
      <div class="swiper-slide" v-show="currentIndex === 3">
        <img src="/step4.jpg" alt="步骤4" class="slide-img">
      </div>
      <div class="swiper-slide" v-show="currentIndex === 4">
        <img src="/step5.jpg" alt="步骤5" class="slide-img">
      </div>

      <div class="swiper-dots">
        <span
          v-for="(dot, index) in 5"
          :key="index"
          class="dot"
          :class="{ active: currentIndex === index }"
          @click="goToSlide(index)"
        ></span>
      </div>
    </div>

    <div class="btn-box">
      <button class="start-btn" @click="goToHome">开始使用</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GuidePage',
  data() {
    return {
      currentIndex: 0,
      timer: null
    }
  },
  mounted() {
    this.startAutoSwiper()
  },
  beforeUnmount() {
    clearInterval(this.timer)
  },
  methods: {
    startAutoSwiper() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % 5
      }, 3000)
    },
    goToSlide(index) {
      this.currentIndex = index
      this.startAutoSwiper()
    },
    goToHome() {
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped>
.guide-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.swiper-container {
  width: 100%;
  height: 66.6vh;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.swiper-slide {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.5s ease;
}

.slide-img {
  max-height: 100%;
  max-width: 90%;
  aspect-ratio: 1.5 / 1;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.swiper-dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ccc;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: #409eff;
  transform: scale(1.2);
}

.btn-box {
  margin-top: 30px;
}

.start-btn {
  padding: 14px 60px;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.start-btn:hover {
  background: #3a8ee6;
}
</style>