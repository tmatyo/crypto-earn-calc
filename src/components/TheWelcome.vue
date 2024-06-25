<script setup>
import { onMounted, ref, inject } from "vue";
import { useTransactionStore } from "../stores/TransactionStore";
import { getRate } from "../utils/ExchangeRates";

const $papa = inject('$papa');
const $router = inject('$router');
const files = ref([]);
const csv = ref({});
const dropzoneState = ref(false);
const tas = ref({});

function toggleActive(e) {
	// dealing with all file upload + related events, NEEDS WORK
	if (["dragover", "dragenter", "dragleave", "drop"].indexOf(e.type) + 1) {
		e.dataTransfer.dropEffect = "move";
	}

	dropzoneState.value = !dropzoneState.value;
	let files;

	// gather files from input
	if (e.type == "change") {
		files = e.target.files;
	}

	// fetch files from dropzone
	if (e.type == "drop") {
		files = e.dataTransfer.files;
	}

	// if there is a file to work with ...
	if (e.type == "drop" || e.type == "change") {
		console.log('There is a file to work with');
		console.log(files);
		console.log("File name: ", files[0].name);
		console.log("File type: ", files[0].type);
		console.log("File size: ", files[0].size);

		// ... and it is in fact a CSV file ...
		if (files[0].type != "text/csv") {
			return;
		}
    
		// ... parse it with papaparse
		$papa.parse(files[0], {
			skipEmptyLines: true,
			dynamicTyping: true,
			header: true,
			transformHeader: function (h) {
				return h.toLowerCase().replaceAll("(", "").replaceAll(")", "").replaceAll(" ", "_");
			},
			complete: function (res) {
				// saving parsed JSON and handing over to next method for calculations
				csv.value = res;
				workWithData();
			},
		});
		console.log('File parsed i guess');
	}
};

const workWithData = () => {
	// TO DO: calculations, render on fancy front end, keep reactivity/interactivity
	console.log('Data from the file', csv.value.data);

	// adding state management
	//var tas = useTransactionStore();
	tas.value.addTransactions(csv.value.data);

	// render fancy report
	$router.push({ name: "about" });
};

onMounted(() => {
	//getRate('ETH', 'EUR');
	tas.value = useTransactionStore();
});
</script>

<template>
	<div class="welcome">
		<div
			class="upload"
			@dragover.prevent
			@dragenter.prevent="toggleActive"
			@dragleave.prevent="toggleActive"
			@drop.prevent="toggleActive"
			:class="{ 'active-upload': dropzoneState }"
		>
			<p>Drag and drop your CSV file here</p>
			<span>OR</span>
			<label for="dd" @click="toggleActive">Choose file</label>
			<input type="file" id="dd" accept=".csv" @change="toggleActive" />
		</div>
		<div class="upload-footer">
			<p>HOW IT WORKS:</p>
			<ol>
				<li>Export your transactions from the crypto [dot] com app as a CSV file</li>
				<li>Drag and drop the CSV in the dashed square above and let your PC/Phone do all the work for you</li>
			</ol>
			<p>IMPORTANT:</p>
			<p>
				This is a browser app. Meaning: it has no server side. The file won't be sent anywhere, all calculations
				will be done on your device.<br />YOUR DATA WON'T LEAVE THE BROWSER!
			</p>
			<p v-for="c in tas.exchangeRates">1 {{ c.asset_id_base }} = {{ c.rate + " " + c.asset_id_quote }}</p>
		</div>
	</div>
</template>

<style>
.welcome {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.welcome .upload {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border: 3px dashed #fff;
	border-radius: 10px;
	width: 70vw;
	height: 50vh;
	row-gap: 20px;
}

.welcome .upload p {
	font-weight: bold;
}

.welcome .upload label {
	background: #fff;
	color: var(--brand-color);
	padding: 5px 10px;
	border-radius: 3px;
}

.welcome .upload input {
	display: none;
}

.welcome .upload-footer {
	display: flex;
	flex-direction: column;
	margin: 50px 0;
	width: 70vw;
	line-height: 2;
	row-gap: 20px;
	font-size: small;
}

.welcome .upload-footer li {
	margin-left: 2em;
}

.upload.active-upload {
	border: 3px dashed var(--text-sub-color);
	color: var(--text-sub-color);
}

.upload.active-upload label {
	background: var(--text-sub-color);
	color: #fff;
}
</style>
