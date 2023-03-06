<script>
  import { useRenderDataStore } from '../stores/RenderDataStore'
  import { useTransactionStore } from '../stores/TransactionStore'
  import { useRouter } from 'vue-router'

  export default {
    setup() {
    const tas = useTransactionStore();
    const rd = useRenderDataStore();
    console.log('💸', rd.data.expenses);
    console.log('🪙', rd.data.crypto);
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
    <p>Number of transactions <span class="cec-important">{{ tas.getCount }}</span>. Users native currency is <span class="cec-important">{{ tas.getNativeCurrency }}</span>. 
		Investment duration is <span class="cec-important">{{ tas.getInvestmentDurationInDays.days }}</span> days. Rewards total: <span class="cec-important">{{ tas.getRewardSum.sum + " " + tas.getNativeCurrency }}</span>.
		Portfolio net worth based on buy price: <span class="cec-important">{{ tas.getAllCoins.sum + " " + tas.getNativeCurrency }}</span>.</p>
    <br>
	<p>All my coins:</p>
	<ul>
		<li v-for="c in tas.getAllCoins.rewards">
			{{ c.currency }} <span class="cec-important">{{ c.amount }}</span> ( <span class="cec-important">{{ c.native_amount.toFixed(2) }} {{ tas.getNativeCurrency }}</span>)
		</li>
	</ul>
	<br>
    <p>Deposit data: </p>
    <ul>
      <li>Count: <span class="cec-important">{{ tas.getDepositInfo.count }}</span></li>
      <li>Min: <span class="cec-important">{{ tas.getDepositInfo.min + " " + tas.getNativeCurrency  }}</span> ({{ tas.getDepositInfo.minDate }})</li>
      <li>Max: <span class="cec-important">{{ tas.getDepositInfo.max + " " + tas.getNativeCurrency  }}</span> ({{ tas.getDepositInfo.maxDate }})</li>
      <li>Avg: <span class="cec-important">{{ tas.getDepositInfo.avg + " " + tas.getNativeCurrency  }}</span></li>
      <li>Sum: <span class="cec-important">{{ tas.getDepositInfo.sum + " " + tas.getNativeCurrency  }}</span></li>
    </ul>
    <p>Bought: </p>
	<ul>
		<li v-for="b in tas.getDepositInfo.portfolio">
			{{ b.currency }} <span class="cec-important">{{ b.amount }}</span> ( <span class="cec-important">{{ b.native_amount.toFixed(2) }} {{ tas.getNativeCurrency }}</span>)
		</li>
	</ul>
    <br>
    <p>Rewards by currency:</p>
    <ul>
		<li v-for="r in tas.getRewardSum.byCurrency">
			{{ r.currency }} <span class="cec-important">{{ r.amount }} </span> ( <span class="cec-important">{{ r.native_amount.toFixed(2) }} {{ tas.getNativeCurrency }}</span>)
		</li>
    </ul>
    <p>Rewards by type:</p>
    <ul>
    	<li v-for="r in tas.getRewardSum.byType">
			{{ r.type }}: <span class="cec-important">{{ r.native_amount.toFixed(2) + " " + tas.getNativeCurrency }}</span>
		</li>
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

.cec-important {
	font-weight: bold;
	color: var(--text-sub-color);
}

</style>