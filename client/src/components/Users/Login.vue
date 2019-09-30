<template>
      <div class="card">
        <section class="hero is-ligth">
          <div class="hero-body">
            <div class="container has-text-left">
              <h1 class="title">Login</h1>
              <hr/>
              <div class="columns is-desktop">
                <div class="column is-two-fifths">
                  <b-field label="Email">
                    <b-input type="email" ref='email' icon="email" required v-model="email"></b-input>
                  </b-field>
                </div>
                <div class="column is-two-fifths">
                  <b-field label="Password">
                      <b-input type="password" ref='password' icon="lock-question" required v-model="password">
                      </b-input>
                  </b-field>
                </div>
              </div>
            </div>
            <div class="container has-text-left">
              <div class="columns is-desktop">
                <div class="column is-one-fifth">
                  <b-button size="is-medium" type="is-primary" @click="Validate">Login</b-button>
                </div>
              </div>
            </div>
          </div>
        </section>
  </div>
</template>

<script>
import UserService from '@/Services/UserService'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async Login () {
      await UserService.login({
        email: this.email,
        password: this.password
      })
        .then(response => {
          if (response.data.Status === 200) {
            this.SetSession(response.data.User)
            this.$emit('close')
            this.$router.push('Main')
          }
          if (response.data.Status === 404) {
            this.$buefy.dialog.alert({
              title: `User doesn't exist`,
              message: `<strong>The email and / or password are incorrect</strong>`,
              type: 'is-danger',
              hasIcon: true,
              icon: 'times-circle',
              iconPack: 'fa'
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    SetSession (User) {
      this.$session.start()
      this.$session.set('User', User.Code)
      this.$session.set('Season', User.CurrentSeason)
      this.$session.set('Generated', User.Generated)
      this.$session.set('Email', User.Email)
    },
    Validate () {
      if (this.$refs.email.checkHtml5Validity() && this.$refs.password.checkHtml5Validity()) this.Login()
    }
  }
}
</script>

<style scoped>
hr{
  background-color:#ff3860;
}
</style>
