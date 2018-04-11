<template>
    <div class="city_container">
        <span>{{value}}</span>
        <button @click='handleClick'>test</button>
        <Label name="李四" age="100"></Label>
        <Route></Route>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                value: 'city'
            }
        },
        mounted(){
        },

        components: {},

        computed: {},

        methods: {
            handleClick(){
                this.$store.dispatch('updateHomeData', {msg: '222'});
            }
        }
    }
</script>
