<template>
  <div class='container flex-column-center'>
    other
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';

  import {Url, Util} from '../../utils';

  export default {
    name: 'other',
    data() {
      return {
      };
    },
    computed: {
      ...mapGetters(['unionId'])
    },
    created() {
    },
    mounted() {
    },
    beforeDestroy() {
    },
    methods: {
    }
  };
</script>

<style scoped lang='less'>

  .container {
  }
</style>
