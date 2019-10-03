<template>
<div>
  <section class="hero is-dark" :active.sync="isPogressModalActive" v-if="this.$session.get('Generated') === 0">
    <div class="hero-body">
      <div class="container has-text-left" >
        <h1 class="title">{{ GenerateText }}</h1>
        <hr/>
        <vue-progress-bar></vue-progress-bar>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import GenerateService from '@/Services/GenerateService'
import UserService from '@/Services/UserService'
var Functions = require('../../../server/functions/functions')
var Constants = require('../../../server/functions/constants')
export default {
  name: 'Main',
  data () {
    return {
      regions: [],
      selectedRegion: [],
      systemCompetition: [],
      groups: [],
      isPogressModalActive: true,
      GenerateText: 'Generate data'
    }
  },
  mounted () {
    this.GetSystemCompetition()
    this.checkGenerateData()
  },
  methods: {
    GetSystemCompetition () {
      this.systemCompetition = Object.entries(Functions.GetSystemCompetition(0))
      this.groups = Constants.GROUPS
    },
    SetDataGenerate (Region, Competition) {
      let data = {
        region: Region,
        competition: Competition,
        user: this.$session.get('User'),
        season: this.$session.get('Season')
      }

      return data
    },
    async Generate () {
      let counter = 0
      this.$Progress.start()
      this.GenerateText = 'Generating Ranking'
      await GenerateService.GenerateRankings({
        user: this.$session.get('User')
      })

      for (var key in this.systemCompetition) {
        this.GenerateText = `Generating Competition: ${this.systemCompetition[key][1].Name}`
        this.$Progress.set(0)
        let data = {}
        switch (this.systemCompetition[key][0]) {
          case 'PreQualifierEuroBasket':
            data = this.SetDataGenerate(this.systemCompetition[key][1].Region, this.systemCompetition[key][1].CodeCompetition)
            break
          case 'PreQualifierAmeriCup':
            data = this.SetDataGenerate(this.systemCompetition[key][1].Region, this.systemCompetition[key][1].CodeCompetition)
            break
          case 'PreQualifierAsiaCup':
            data = this.SetDataGenerate(this.systemCompetition[key][1].Region, this.systemCompetition[key][1].CodeCompetition)
            break
          case 'PreQualifierAfricanBasket':
            data = this.SetDataGenerate(this.systemCompetition[key][1].Region, this.systemCompetition[key][1].CodeCompetition)
            break
        }
        const tc = await GenerateService.GenerateTeamsCompetition(data)
        if (tc.status === 200) {
          this.GenerateText = `Generating Groups of ${this.systemCompetition[key][1].Name}`
          const gc = await GenerateService.GenerateGroups(data)
          if (gc.status === 200) {
            this.GenerateText = `Generating Matches of ${this.systemCompetition[key][1].Name}`
            for (var x = 0; x < this.systemCompetition[key][1].NumberGroups; x++) {
              const gm = await GenerateService.GenerateMatches({
                competition: this.systemCompetition[key][1].CodeCompetition,
                group: this.groups[x],
                user: this.$session.get('User'),
                season: this.$session.get('Season'),
                typeMatch: 'Group'
              })
              if (gm.status === 200) counter++
            }
          }
        }
      }

      if (counter > 0) {
        await UserService.updateGeneratedSeason({
          email: this.$session.get('Email'),
          generated: 1,
          currentseason: 1
        }).then(
          this.$session.set('Generated', 1),
          this.$Progress.finish(),
          this.isPogressModalActive = false,
          this.$buefy.notification.open({
            message: 'Generated data correctly!',
            type: 'is-success'
          })
        )
      }
    },
    checkGenerateData () {
      if (this.$session.get('Generated') !== 1) this.Generate()
      else this.isPogressModalActive = false
    }
  }
}
</script>

<style scoped>
hr{
  background-color:#ff3860;
}
</style>
