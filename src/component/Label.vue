<template>
    <div>
        <span>姓名： {{name}}</span>
        <span>年龄： {{age}}</span>
    </div>
</template>
<script>
    export default {
        name: 'customLabel',
        props: ['name', 'age'],
        data(){
            return {
            }
        },
        computed: {
//            labelData() {
//                return {
//
//                }
//            }
        }
    }
</script>
