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
  <div class="upload-footer">
    <p>HOW IT WORKS:</p>
    <ol>
      <li>Export your transactions from the crypto [dot] com app as a CSV file</li>
      <li>Drag and drop the CSV in the dashed square above and let your PC/Phone do all the work for you</li>
    </ol>
    <p>IMPORTANT: This is a browser app. Meaning: it has no server side. The file won't be sent anywhere, all calculations will be done on your device. YOUR DATA WON'T LEAVE THE BROWSER!</p>
  </div>
</div>

</template>

<style>
.welcome {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
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
  width: 70vw;
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

.welcome .upload-footer {
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  width: 70vw;
  line-height: 2;
  row-gap: 20px;
}

.welcome .upload-footer li {
  margin-left: 2em;
}

</style>