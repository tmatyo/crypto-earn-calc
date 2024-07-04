<script setup>
import { formatCurrency } from "../../utils/Formatter";
import StatTile from "./StatTile.vue";

const props = defineProps({
	data: {
		required: true,
	},
	subTitle: {
		required: true,
	},
});
</script>

<template>
	<div class="stat-data-block">
		<h2>{{ props.subTitle }}</h2>
		<div class="stat-container">
			<StatTile
				v-for="d in props.data"
				:titleText="formatCurrency(d.rate) + ' ' + d.native_currency"
				:subText="d.currency"
			/>
		</div>
	</div>
</template>
