<template>
<div>
  <section class="hero">
    <div class="hero-body">
      <div class="tile is-ancestor">
        <div class="tile is-parent titleRegion">
          <p class="title">{{ region }}</p>
        </div>
      </div>
    </div>
  </section>
  <section v-for="competition of systemCompetition" :key="competition.CodeCompetition">
   <div v-if="competition.Region === codeRegion">
     <section class="section">
       <b-message :title="competition.Name" size="is-small" :closable="false">
         Lore ipsum
       </b-message>
     </section>
      <b-navbar-item tag="router-link" :to="{ path: `/competition/${competition.CodeCompetition}/Groups` }">
      <p class="title">{{ competition.Name }}</p>
      </b-navbar-item>
    </div>
  </section>
</div>
</template>

<script>
var Functions = require('../../../../server/functions/functions')
export default {
  name: 'Competitions',
  data () {
    return {
      systemCompetition: [],
      region: '',
      codeRegion: ''
    }
  },
  mounted () {
    this.getSystemCompetition()
    this.printRegion()
  },
  methods: {
    getSystemCompetition () {
      this.systemCompetition = Functions.GetSystemCompetition(0)
    },
    printRegion () {
      switch (this.$route.params.region) {
        case 'EU':
          this.region = 'Europe'
          this.codeRegion = this.$route.params.region
          break
        case 'AM':
          this.region = 'America'
          this.codeRegion = this.$route.params.region
          break
        case 'AS':
          this.region = 'Asia'
          this.codeRegion = this.$route.params.region
          break
        case 'AF':
          this.region = 'Africa'
          this.codeRegion = this.$route.params.region
          break
      }
    }
  }
}
</script>

<style>
tr.is-classified {
  background: #ff879fed;
  color: #004465;
  font-weight: bold;
}
tr.is-loser {
  background: #ff879f75;
  color: #004465;
  font-weight: bold;
}
.titleRegion {
  border-bottom: 1px solid #ff3860;
}
</style>
