<template>
  <div class="d-flex flex-column min-vh-100">
    <Header></Header>
    
    <div class="flex-grow-1">
      <RouterView></RouterView>
    </div>

      <Footer></Footer>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
</script>
