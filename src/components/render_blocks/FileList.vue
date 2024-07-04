<script setup>
const props = defineProps({
	files: {
		required: true,
	},
});
</script>

<template>
	<div class="stat-data-block">
		<h2>Files</h2>
		<div class="">
			<table>
				<tbody>
					<tr>
						<th>Name</th>
						<th>Size</th>
						<th>Last Modified</th>
						<th>Date from</th>
						<th>Date to</th>
					</tr>
					<tr v-for="file in files">
						<td>{{ file.name.replaceAll("_", " ") }}</td>
						<td>{{ file.size }}</td>
						<td>{{ file.lastModifiedDate.toLocaleString("sv-SE") }}</td>
						<td>{{ file.dateFrom }}</td>
						<td>{{ file.dateTo }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<style scoped>
table {
	width: 100%;

	th {
		color: #1183d8;
	}
}
</style>
