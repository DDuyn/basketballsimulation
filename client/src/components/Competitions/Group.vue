<template>
  <div>

  </div>
</template>

<script>

export default {
    name: 'Group',
    data () {
      return {

      }
    },
    mounted () {
      this.log()
    },
    methods: {
      log () {
        console.log(`Competition ${this.$route.params.codeCompetition}`)
        console.log(`Group ${this.$route.params.group}`)
      }
    }
  }
</script>

<style scoped>

</style>
