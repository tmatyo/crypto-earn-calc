<script setup>
import { ref } from "vue";
import { formatCurrency } from "../../utils/Formatter";
import StatTile from "./StatTile.vue";
import { getYield } from "../../utils/Calculator";

const props = defineProps({
	data: {
		required: true,
	},
	bought: {
		required: true,
	},
	earned: {
		required: true,
	},
	meta: {
		required: true,
	},
});
console.log("props data", props.data);
console.log("props bought", props.bought);
console.log("props earned", props.earned);

const portfolio = ref([]);

for (const i of props.data) {
	let bf = 0;
	for (const j of props.bought) {
		if (i.currency === j.currency) {
			bf = j.native_amount;
		}
	}

	if (bf === 0) {
		for (const k of props.earned) {
			if (i.currency === k.currency) {
				bf = k.native_amount;
			}
		}
	}

	portfolio.value.push({ ...i, boughtFor: bf });
}

console.log(portfolio.value);
</script>

<template>
	<div class="stat-data-block">
		<h2>
			Crypto portfolio
			<span class="cec-important">{{
				formatCurrency(props.meta.aprox_net_worth) + " " + props.data[0].native_currency
			}}</span>
		</h2>
		<div class="stat-container">
			<StatTile
				v-for="d in portfolio"
				:titleText="formatCurrency(d.amount) + ' ' + d.currency"
				:subText="formatCurrency(d.current_worth) + ' ' + d.native_currency"
				:percentage="getYield(d.boughtFor, d.current_worth).percentage"
			/>
		</div>
	</div>
</template>
