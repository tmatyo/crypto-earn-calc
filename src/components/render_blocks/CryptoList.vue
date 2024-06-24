<script setup>
import { formatCurrency } from "../../utils/Formatter";

const props = defineProps({
	data: {
		required: true,
	},
	meta: {
		required: true,
	},
});
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
			<div v-for="d in props.data" class="stat-tile">
				<p class="data-value">{{ formatCurrency(d.amount) + " " + d.currency }}</p>
				<small class="data-desc">{{ formatCurrency(d.current_worth) + " " + d.native_currency }}</small>
			</div>
		</div>
	</div>
</template>
