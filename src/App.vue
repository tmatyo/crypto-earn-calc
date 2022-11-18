<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld 
      welcome="Welcome to the CEC App" 
      sub="Calculate crypto earnings from crypto [dot] com!"/>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>


</style>
