<template>
  <div class="image-container"> 
    <img :src="imagePath" alt="Home Screenshot" class="styled-image"/>
  </div>
</template>

<script setup lang="ts" name="raven-home">
import { ref } from 'vue'
import homeImage from '/src/assets/img/home.jpg'

const imagePath = ref(homeImage)
</script>



<style>
.image-container {
  background: url("/src/assets/img/home.jpg") center center no-repeat;  width: 200%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>


