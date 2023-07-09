<script setup>
import { formatCurrency } from '../../utils/Formatter';

const props = defineProps({
    count: {
        required: true
    },
    nativeCurrency: {
        required: true
    },
    duration: {
        required: true
    },
    rewards: {
        required: true
    }
})
</script>

<template>
    <div class="stat-data-block">
        <h2>User stats</h2>
        <div class="stat-container">
            <div class="stat-tile">
                <p class="data-value">{{ count }} </p>
                <small class="data-desc">Number of transactions</small>
            </div>
            <div class="stat-tile">
                <p class="data-value">{{ nativeCurrency }} </p>
                <small class="data-desc">Native currency</small>
            </div>
            <div class="stat-tile">
                <p class="data-value">{{ duration }} </p>
                <small class="data-desc">Investment duration (days)</small>
            </div>
            <div class="stat-tile">
                <p class="data-value">{{ formatCurrency(rewards) }} </p>
                <small class="data-desc">Total rewards (EUR)</small>
            </div>
        </div>
    </div>
</template> 