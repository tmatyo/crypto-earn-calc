<script setup>
defineProps({
  welcome: {
    type: String,
    required: true
  },
  sub: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="container">
    <h1>{{ welcome }}</h1>
    <p class="subtitle">{{ sub }}</p>
  </div>
</template>

<style scoped>

.container {
  padding: 20px;
  margin-bottom: 50px;
  text-align: center;
}

.container .subtitle {
  color: var(--text-sub-color);
}

</style>
