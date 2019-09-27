<template>
  <div id="app">
      <Navigation></Navigation>
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
  color: white;
}

.label {
  color: #ff3860;
}

.input {
  border-color: #f9a2b4;
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

.hero-body {
  background-color: #0a2c3c;
}

</style>
