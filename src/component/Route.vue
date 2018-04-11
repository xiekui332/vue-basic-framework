<template>
    <div>
        <button @click="translateRouter('/home')">home</button>
        <button @click="translateRouter('/city')">city</button>
    </div>
</template>
<script>
    export default {
        name: 'route',
        methods: {
            translateRouter(path) {
                path && this.$router.push(path);
            }
        }
    }
</script>
