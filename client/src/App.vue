<template>
  <div id="app">
      <Navigation v-if="this.$route.path !== '/NotFound'"></Navigation>
      <router-view/>
  </div>
</template>

<script>
import Navigation from './components/Navigation'
export default {
  name: 'App',
  components: {
    'Navigation': Navigation
  }
}
</script>

<style>
#app {
  font-family: 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.title {
  color: #0a2c3c;
}

.label {
  color: #0a2c3c;
}

.input {
  border-color: #0a2c3c;
  color: #004465;
  font-weight: bold;
}

.input:hover {
  border-color: #ff3860;
}

.control.has-icons-left .icon {
  color: #f9a2b4;
}

.control.has-icons-left .input:focus ~ .icon {
  color: #ff3860;
}

.help.is-danger {
  color: #ff3860;
}

.button.is-primary {
  background-color: #0a2c3c;
}

.button.is-primary:hover{
  background-color: #ff3860;
}
.navbar-menu {
    border-bottom: 2px solid #ff3860;
}
.progress.is-primary:indeterminate {
  background-image: linear-gradient(to right, #ff3860 30%, #0a2c3c 30%)
}

</style>
