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
            <th>Timestamp</th>
            <th>Description</th>
            <th>Currency</th>
            <th>Amount</th>
            <th>To Currency</th>
            <th>To Amount</th>
            <th>Native Currency</th>
            <th>Native Amount</th>
            <th>N.A. in USD</th>
            <th>Tr. Kind</th>
        </tr>
        <tr v-for="t in tas.transactions[0].slice(2)">
            <td>{{ t.timestamp_utc }}</td>
            <td>{{ t.transaction_description }}</td>
            <td>{{ t.currency }}</td>
            <td>{{ t.amount }}</td>
            <td>{{ t.to_currency }}</td>
            <td>{{ t.to_amount }}</td>
            <td>{{ t.native_currency }}</td>
            <td>{{ t.native_amount }}</td>
            <td>{{ t.native_amount_in_usd }}</td>
            <td>{{ t.transaction_kind }}</td>
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