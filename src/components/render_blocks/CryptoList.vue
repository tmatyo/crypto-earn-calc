<script>
export default {
    props: ['data', 'meta'],
    super(props) {
        console.log('These are the props: ', props);
        return { props }
    }
}
</script>

<template>
    <div class="stat-data-block">
        <!-- <h2>Crypto portfolio 
            <span class="cec-important">{{ props.meta.aprox_net_worth.toFixed(2) + " " + props.data[0].native_currency }}</span>
        </h2>
        <div class="stat-container">
            <div v-for="d in props.data" class="stat-tile">
                <p class="data-value">{{ d.amount.toFixed(2) + " " + d.currency}} </p>
                <small class="data-desc">{{ d.current_worth.toFixed(2) + " " + d.native_currency }}</small>
            </div>
        </div> -->
    </div>
</template>