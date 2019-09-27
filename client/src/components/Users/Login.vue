<template>
  <section class="hero is-ligth">
    <div class="hero-body">
      <div class="container has-text-left">
        <h1 class="title">Sign up</h1>
        <hr/>
        <div class="columns is-desktop">
          <div class="column is-two-fifths">
            <b-field label="Email">
              <b-input type="email" icon="email" required></b-input>
            </b-field>
          </div>
        </div>
      <div class="columns is-desktop">
        <div class="column is-two-fifths">
          <b-field label="Password">
              <b-input type="password" icon="lock-question" required>
              </b-input>
          </b-field>
        </div>
      </div>
      </div>
      <div class="container has-text-left">
        <div class="columns is-desktop">
          <div class="column is-one-fifth">
            <b-button size="is-medium" type="is-primary">Sign up</b-button>
          </div>
        </div>
      </div>
    </div>
  </section>
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
        this.$session.set('Generated', response.data.Generated)
        this.$session.set('Email', response.data.Email)
      }

      console.log(this.$session.get('User'))
    }
  }
}
</script>

<style scoped>
hr{
  background-color:#ff3860;
}
</style>
