<script setup>
import { onMounted, ref, inject } from "vue";
import { useTransactionStore } from "../stores/TransactionStore";
import { uniqBy } from "../utils/Formatter";

const $papa = inject("$papa");
const $router = inject("$router");
const files = ref([]);
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
		console.log("File(s) were dropped/uploaded");
		console.log(files);

		let validFiles = [];
		let csv = [];

		for (const file of files) {
			console.log(`File: ${file.name}, ${file.type}, size ${file.size}`);
			if (file.type === "text/csv" && file.name.startsWith("crypto_transactions_record_")) {
				validFiles.push(file);
			}
		}

		// ... parse it with papaparse
		for (const [iterator, validFile] of validFiles.entries()) {
			$papa.parse(validFile, {
				skipEmptyLines: true,
				dynamicTyping: true,
				header: true,
				transformHeader: function (h) {
					return h.toLowerCase().replaceAll("(", "").replaceAll(")", "").replaceAll(" ", "_");
				},
				complete: function (res) {
					// saving content of each file
					csv = [...csv, ...res.data];

					// saving stats about the file
					const { name, type, size, lastModifiedDate } = validFile;
					tas.value.addFile({
						name,
						type,
						size,
						lastModifiedDate,
						dateFrom: res.data[0].timestamp_utc,
						dateTo: res.data[res.data.length - 1].timestamp_utc,
					});

					// when all the files were parsed, start calculating
					if (iterator === validFiles.length - 1) {
						workWithData(csv);
					}
				},
			});
		}

		console.log("File(s) parsed i guess");
	}
}

const workWithData = (csv) => {
	// TO DO: calculations, render on fancy front end, keep reactivity/interactivity
	csv = uniqBy(csv, "timestamp_utc");
	csv.sort((x, y) => x.timestamp_utc - y.timestamp_utc);

	// adding state management
	tas.value.addTransactions(csv);

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
			<input type="file" id="dd" accept=".csv" @change="toggleActive" multiple />
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
