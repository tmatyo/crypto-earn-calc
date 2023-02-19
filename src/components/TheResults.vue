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
    <br>
    <p>Deposit data: </p>
    <ul>
      <li>Count: {{ tas.getDepositInfo.count }}</li>
      <li>Min: {{ tas.getDepositInfo.min }} ({{ tas.getDepositInfo.minDate }})</li>
      <li>Max: {{ tas.getDepositInfo.max }} ({{ tas.getDepositInfo.maxDate }})</li>
      <li>Avg: {{ tas.getDepositInfo.avg }}</li>
      <li>Sum: {{ tas.getDepositInfo.sum }}</li>
    </ul>
    <br>
    <p>Investment duration is {{ tas.getInvestmentDurationInDays.days }} days.</p>
    <br>
    <p>Rewards total: {{ tas.getRewardSum.sum + " " + tas.getNativeCurrency }}. Namely:</p>
    <ul>
      <li v-for="r in tas.getRewardSum.byCurrency">{{ r.currency + " " + r.amount + " (" + r.native_amount.toFixed(2) + " " + tas.getNativeCurrency }})</li>
    </ul>
    <p>That is:</p>
    <ul>
      <li v-for="r in tas.getRewardSum.byType">{{ r.type + ": " + r.native_amount.toFixed(2) + " " + tas.getNativeCurrency }}</li>
    </ul>

    <table class="results">
        <tr class="results-header">
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
        <tr v-for="t in tas.transactions">
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

.results {
    border: 1px solid var(--color-text);
    border-collapse: collapse;
    width: 100%;
}

.results .results-header {
    background: var(--color-text);
}

.results .results-header th {
    font-size: 12px;
    font-weight: bold;
    padding: 5px 0;
}

.results tr:nth-of-type(odd) {
    background: var(--color-text);
}

.results td {
    font-size: 11px;
    padding: 5px;
    text-align: center;
}

</style>