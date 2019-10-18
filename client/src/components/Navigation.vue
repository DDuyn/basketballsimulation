<template>
<div>
    <b-navbar>
        <template slot="start" v-if="this.$route.path !== '/'">
            <b-navbar-item tag="router-link" :to="{ path: '/main' }">
                Home
            </b-navbar-item>
            <b-navbar-item href="#">
                Documentation
            </b-navbar-item>
            <b-navbar-dropdown label="Competitions">
                <b-navbar-item tag="router-link" :to="{ path: '/competitions/EU' }">
                    Europe
                </b-navbar-item>
                <b-navbar-item tag="router-link" :to="{ path: '/competitions/AM' }">
                    PreQualifier America
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>
        <template slot="start" v-if="this.$route.path === '/'">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
            Basketball Simulator
        </b-navbar-item>
        </template>
        <template slot="end" v-if="this.$route.path === '/'">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <b-button type="is-primary" @click="showModalSignUp">
                        <strong>Sign up</strong>
                    </b-button>
                    <a class="button is-light" @click="showModal">
                        Log in
                    </a>
                </div>
            </b-navbar-item>
        </template>
        <template slot="end" v-if="this.$route.path !== '/'">
            <b-navbar-item>
                <a class="button is-light">
                    {{this.$session.get('Email')}}
                </a>
            </b-navbar-item>
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a class="button is-light" @click="LogOut">
                        Log Out
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
    <b-modal :active.sync="isLoginModalActive">
        <Login @close="closeModal"></Login>
    </b-modal>
    <b-modal :active.sync="isSignUpModalActive">
        <SignIn @close='closeModalSignUp'></Signin>
    </b-modal>
</div>
</template>

<script>
import Login from './Users/Login'
import Signin from './Users/SignIn'
export default {
  name: 'Navigation',
  components: {
    'Login': Login,
    'SignIn': Signin
  },
  data () {
    return {
      isSignUpModalActive: false,
      isLoginModalActive: false
    }
  },
  methods: {
    showModal () {
      this.isLoginModalActive = true
    },
    closeModal () {
      this.isLoginModalActive = false
    },
    showModalSignUp () {
      this.isSignUpModalActive = true
    },
    closeModalSignUp () {
      this.isSignUpModalActive = false
    },
    LogOut () {
      this.$session.destroy()
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.card {
    border: 5px solid #0a2c3c;
    border-radius: 1%;
}

.button.is-light:hover {
    color: #ff3860;
}

</style>
