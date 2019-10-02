<template>
    <div class="card">
    <ValidationObserver v-slot="{ passes }">
      <section class="hero is-ligth">
          <form @submit.prevent="passes(validate)">
          <div class="hero-body">
            <div class="container has-text-left">
              <h1 class="title">Sign Up</h1>
              <hr/>
              <div class="columns is-desktop">
                <div class="column is-two-fifths">
                <ValidationProvider name="username" ref='name' rules="required" v-slot="{ errors }">
                  <b-field label="Username"
                    :type="{'is-danger': errors[0]}"
                    :message="errors[0]"
                    >
                    <b-input name='name' icon="account" v-model="name"></b-input>
                  </b-field>
                </ValidationProvider>
                </div>
                <div class="column is-two-fifths">
                <ValidationProvider name='email' ref='email' rules='required|email' v-slot="{ errors }">
                  <b-field label="Email"
                    :type="{'is-danger': errors[0]}"
                    :message="errors[0]"
                  >
                    <b-input type="email" icon="email" v-model="email"></b-input>
                  </b-field>
                </ValidationProvider>
                </div>
              </div>
              <div class="columns is-desktop">
                <div class="column is-two-fifths">
                <ValidationProvider name="password" ref='password' rules='required|min:8' v-slot="{ errors }">
                  <b-field label="Password"
                    :type="{'is-danger': errors[0]}"
                    :message="errors[0]"
                  >
                      <b-input type="password" icon="lock-question" v-model="password">
                      </b-input>
                  </b-field>
                </ValidationProvider>
                </div>
                <div class="column is-two-fifths">
                <ValidationProvider name="Confirm Password" ref='passwordConfirm' rules='required|confirmed:password' v-slot="{ errors }">
                  <b-field label="Confirm Password"
                    :type="{'is-danger': errors[0]}"
                    :message="errors[0]"
                  >
                      <b-input type="password" icon="lock-question" v-model="passwordConfirm">
                      </b-input>
                  </b-field>
                </ValidationProvider>
                </div>
              </div>
            </div>
            <div class="container has-text-left">
              <div class="columns is-desktop">
                <div class="column is-one-fifth">
                  <button class="button is-primary is-medium">Sign Up</button>
                </div>
              </div>
            </div>
          </div>
          </form>
        </section>
    </ValidationObserver>
    </div>
</template>

<script>
import UserService from '@/Services/UserService'
export default {
  name: 'SignIn',
  data () {
    return {
      email: '',
      password: '',
      name: '',
      passwordConfirm: ''
    }
  },
  methods: {
    async validate () {
      await UserService.register({
        userName: this.name,
        email: this.email,
        password: this.password
      })
        .then(response => {
          if (response.data.Status === 200) {
            this.$buefy.dialog.alert({
              title: `Success`,
              message: `<strong>User created succesfully</strong>`,
              type: 'is-success',
              hasIcon: true,
              icon: 'check-circle',
              iconPack: 'mdi'
            })
            this.$emit('close')
          } else if (response.data.Status === 409) {
            this.$buefy.dialog.alert({
              title: `Error`,
              message: `<strong>Email already exists</strong>`,
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
    }
  }
}
</script>

<style scoped>
hr{
  background-color:#ff3860;
}
</style>
