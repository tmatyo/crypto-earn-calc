<script setup>
const props = defineProps({
    data: {
        required: true
    },
    currency: {
        required: true
    }
})
</script>

<template>
    <div class="stat-data-block">
        <h2>Deposit stats 
            <span class="cec-important">{{ data.sum }} {{ currency }}</span>
        </h2>
        <div class="stat-container">
            <div class="stat-tile">
                <p class="data-value">{{ data.count }} </p>
                <small class="data-desc">Number of deposits</small>
            </div>
            <div class="stat-tile">
                <p class="data-value">{{ data.min }}  {{ currency }}</p>
                <small class="data-desc">Smallest deposit</small>
            </div>
            <div class="stat-tile">
                <p class="data-value">{{ data.max }}  {{ currency }}</p>
                <small class="data-desc">Largest deposit</small>
            </div>
            <div class="stat-tile">
                <p class="data-value">{{ data.avg }}  {{ currency }}</p>
                <small class="data-desc">Average deposit</small>
            </div>
        </div>
    </div>
</template> 