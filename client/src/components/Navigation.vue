<template>
<div>
    <b-navbar>
        <template slot="start">
            <b-navbar-item href="#">
                Home
            </b-navbar-item>
            <b-navbar-item href="#">
                Documentation
            </b-navbar-item>
            <b-navbar-dropdown label="Info">
                <b-navbar-item href="#">
                    About
                </b-navbar-item>
                <b-navbar-item href="#">
                    Contact
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>
        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <b-button type="is-danger"
                        @click="isSignUpModalActive = true"
                    >
                        <strong>Sign up</strong>
                    </b-button>
                    <a class="button is-light">
                        Log in
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
    <b-modal :active.sync="isSignUpModalActive">
        <div class="card">
            <SignUp></SignUp>
        </div>
    </b-modal>
</div>
</template>

<script>
import SignUp from './Users/Login'
export default {
  name: 'Navigation',
  components: {
    'SignUp': SignUp
  },
  data () {
    return {
      isSignUpModalActive: false
    }
  }
}
</script>

<style scoped>
.card {
    border: 5px solid white;
    border-radius: 1%;
}
</style>
