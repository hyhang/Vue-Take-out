<template>
  <div>
    <router-view/>
    <FooterGuied/>
  </div>
</template>

<script type="text/ecmascript-6">
  import FooterGuied from './components/FooterGuide/FooterGuied'
  export default {
    name: 'App',
    components: {
      FooterGuied
    },
    mounted() {
      this.$store.dispatch('autoLogin')
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

 
</style>
