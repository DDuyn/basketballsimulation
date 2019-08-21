<template>
  <div>

  </div>
</template>

<script>
import UserService from '@/Services/UserService'

export default {
  name: 'Login',
  data () {
    return {
      codeUser: 0
    }
  },
  mounted () {
    this.Login()
  },
  methods: {
    async Login () {
      const response = await UserService.login({
        email: 'email@email.com',
        password: '123'
      })

      if (response.status === 200) {
        this.$session.start()
        this.$session.set('User', response.data.CodeUser)
        this.$session.set('Season', response.data.CurrentSeason)
      }

      console.log(this.$session.get('User'))
    }
  }
}
</script>

<style scoped>

</style>
