<script>
import { useTransactionStore } from '../stores/TransactionStore';

export default {
    setup() {
        const tas = useTransactionStore();    

        return { tas }
    }    
}

</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p v-if="!tas.isEmpty">File is uploaded and we CAN work with it :)</p>
    <p v-if="tas.isEmpty">File is uploaded we CANNOT work with it :(</p>
    <p>Number of transactions {{ tas.count }}</p>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
  }
}
</style>