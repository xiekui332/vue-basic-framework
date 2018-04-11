<template>
    <div>
        <h3>count is {{count}}</h3>
        <h3>countAnother is {{countAnother}}</h3>
        <p>{{homeData.msg}}</p>
        <Label :name="labelData.name" :age="labelData.age"></Label>
        <button @click="gotoAddress">+1</button>
        <button @click="click">点击发送 action</button>
        <Route></Route>
    </div>
</template>
<script>
    import {mapState, mapMutations, mapGetters, mapActions} from 'vuex';
    export default {
        data(){
            return {
                labelData: this.labelData
            }
        },
        beforeMount() {
            this.labelData = {
                name: '张三',
                age: 20
            }
        },
        mounted(){
        },
        components: {},
        computed: {
            ...mapState([
                'count'
            ]),
            ...mapGetters([
                'countAnother',
                'homeData'
            ])
        },
        methods: {
            ...mapActions({click: 'countAnother'}),
            ...mapMutations([
                'TEST_ACTION',
                'UPDATE_HOME_DATA'
            ]),
            gotoAddress() {
                this.TEST_ACTION();
                ++this.labelData.age;
                this.UPDATE_HOME_DATA({msg: '111'});
            }
        }
    }
</script>
