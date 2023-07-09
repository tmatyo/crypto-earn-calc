<script setup>
import { formatCurrency } from '../../utils/Formatter';

const props = defineProps({
    data: {
        required: true,
    },
    subTitle: {
        required: true
    }
})
</script>

<template>
    <div class="stat-data-block">
        <h2>{{props.subTitle}}</h2>
        <div class="stat-container">
            <div v-for="d in props.data" class="stat-tile">
                <p class="data-value">{{ formatCurrency(d.native_amount) + " " + d.native_currency}} </p>
                <small class="data-desc">{{ d.transaction_description }}</small>
            </div>
        </div>
    </div>
</template>