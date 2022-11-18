<script setup>

</script>

<template>

<div class="welcome">
  <div class="upload">
    <p>Drag and drop your CSV file here</p>
    <span>OR</span>
    <label for="dd">Choose file</label>
    <input type="file" id="dd">
  </div>
</div>

</template>

<style>
.welcome {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.welcome .upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 3px dashed #fff;
  border-radius: 10px;
  width: 50vw;
  height: 50vh;
  row-gap: 20px;
}

.welcome .upload p {
  font-weight: bold;
}

.welcome .upload label {
  background: #fff;
  color: var(--brand-color);
  padding: 5px 10px;
  border-radius: 3px;
}

.welcome .upload input {
  display: none;
}
</style>