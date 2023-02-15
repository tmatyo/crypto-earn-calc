<script>
  import { useTransactionStore } from '../stores/TransactionStore'
  import { useRouter } from 'vue-router'

  export default {
    setup() {
    const tas = useTransactionStore();
    const router = useRouter();
    var goOn = false;

    if(tas.isEmpty) {
        // results page is opened, but no data was provided? redirect to home page
        router.push({name:'home'});
      } else {
        // preventing premature rendering and filling console log with errors because missing data
        goOn = true;
      }

      return { tas, router, goOn }
    }
  }

</script>


<template>
  <div class="about" v-if="goOn">
    <h1>This is an about page</h1>
    <p v-if="!tas.isEmpty">File is uploaded and we CAN work with it :)</p>
    <p v-if="tas.isEmpty">File is uploaded we CANNOT work with it :(</p>
    <p>Number of transactions {{ tas.getCount }}</p>
    <p>Users native currency is {{ tas.getNativeCurrency }}</p>
    <p>Deposit data: </p>
    <ul>
      <li>Count: {{ tas.getDepositInfo.count }}</li>
      <li>Min: {{ tas.getDepositInfo.min }}</li>
      <li>Max: {{ tas.getDepositInfo.max }}</li>
      <li>Avg: {{ tas.getDepositInfo.avg }}</li>
      <li>Sum: {{ tas.getDepositInfo.sum }}</li>
    </ul>

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
        <tr v-for="t in tas.transactions[0]">
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