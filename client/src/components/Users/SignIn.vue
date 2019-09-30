<template>
    <div class="card">
        <section class="hero is-ligth">
          <div class="hero-body">
            <div class="container has-text-left">
              <h1 class="title">Sign Up</h1>
              <hr/>
              <div class="columns is-desktop">
                <div class="column is-two-fifths">
                  <b-field label="Username">
                    <b-input ref='name' icon="account" required v-model="name"></b-input>
                  </b-field>
                </div>
              </div>
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
                  <b-button size="is-medium" type="is-primary" @click="Validate">Sign Up</b-button>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
</template>

<script>
export default {
  name: 'SignIn',
  data () {
    return {
      email: '',
      password: '',
      name: ''
    }
  }
}
</script>

<style scoped>
hr{
  background-color:#ff3860;
}
</style>
