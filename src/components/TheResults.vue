<script>
  import { useTransactionStore } from '../stores/TransactionStore'

  export default {
    data() {
      return {
        goOn: false,
        tas: '',
        deposit: {
          count: 0,
          min: 0,
          max: 0,
          avg: 0
        }
      }
    },
    methods: {
      calculate(data) {

        return data;
      }
    },
    created() {
      this.tas = useTransactionStore();

      this.deposit = this.tas.getDepositInfo();
      
      if(this.tas.isEmpty) {
        // results page is opened, but no data was provided? redirect to home page
        this.$router.push({name:'home'});
      } else {
        // preventing premature rendering and filling console log with errors because missing data
        this.goOn = true;
      }
      
    }
  }

</script>


<template>
  <div class="about" v-if="this.goOn">
    <h1>This is an about page</h1>
    <p v-if="!this.tas.isEmpty">File is uploaded and we CAN work with it :)</p>
    <p v-if="this.tas.isEmpty">File is uploaded we CANNOT work with it :(</p>
    <p>Number of transactions {{ this.tas.getCount }}</p>
    <p>Users native currency is {{ this.tas.getNativeCurrency }}</p>
    <p>Deposit data: </p>
    <ul>
      <li>Sum: {{ this.deposit.get }}</li>
      <li>Min: {{ this.deposit.min }}</li>
      <li>Max: {{ this.deposit.max }}</li>
      <li>Avg: {{ this.deposit.avg }}</li>
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
        <tr v-for="t in this.tas.transactions[0]">
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