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

    <table class="results">
        <tr>
            <th>{{ tas.transactions[0][0][0] }}</th>
            <th>{{ tas.transactions[0][0][1] }}</th>
            <th>{{ tas.transactions[0][0][2] }}</th>
            <th>{{ tas.transactions[0][0][3] }}</th>
            <th>{{ tas.transactions[0][0][4] }}</th>
            <th>{{ tas.transactions[0][0][5] }}</th>
            <th>{{ tas.transactions[0][0][6] }}</th>
            <th>{{ tas.transactions[0][0][7] }}</th>
            <th>{{ tas.transactions[0][0][8] }}</th>
            <th>{{ tas.transactions[0][0][9] }}</th>
        </tr>
        <tr v-for="t in tas.transactions[0].slice(2)">
            <td>{{ t[0] }}</td>
            <td>{{ t[1] }}</td>
            <td>{{ t[2] }}</td>
            <td>{{ t[3] }}</td>
            <td>{{ t[4] }}</td>
            <td>{{ t[5] }}</td>
            <td>{{ t[6] }}</td>
            <td>{{ t[7] }}</td>
            <td>{{ t[8] }}</td>
            <td>{{ t[9] }}</td>
        </tr>
    </table>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
  }
}
</style>