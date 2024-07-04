<script setup>
import { formatCurrency } from "../../utils/Formatter";
import StatTile from "./StatTile.vue";

const props = defineProps({
	count: {
		required: true,
	},
	nativeCurrency: {
		required: true,
	},
	duration: {
		required: true,
	},
	rewards: {
		required: true,
	},
});
</script>

<template>
	<div class="stat-data-block">
		<h2>User stats</h2>
		<div class="stat-container">
			<StatTile :titleText="count" subText="Number of transactions" />
			<StatTile :titleText="nativeCurrency" subText="Native currency" />
			<StatTile :titleText="duration" subText="Investment duration (days)" />
			<StatTile :titleText="formatCurrency(rewards)" subText="Total rewards (EUR)" />
		</div>
	</div>
</template>
