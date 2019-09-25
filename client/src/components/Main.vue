<template>
  <v-container fluid grid-list-xs>
    <v-layout wrap>
      <v-flex xs2>
      <v-select
        :items="regions"
        v-model="selectedRegion"
        item-value="Code"
        item-text="Name"
        label="Regions"
      ></v-select>
      </v-flex>
    </v-layout>
      <v-layout wrap>
        <v-flex xs2>
          {{this.$session.get('Email')}}
          {{this.$session.get('Generated')}}
          <v-btn v-if="this.$session.get('Generated') === 0" class="ma-2" outlined color="indigo" @click="Generate" :key="componentKey" >Generate Competition</v-btn>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import RegionsService from '@/services/RegionsService'
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
      componentKey: 0
    }
  },
  mounted () {
    this.LoadRegions()
    this.GetSystemCompetition()
  },
  methods: {
    forceUpdate () {
      this.componentKey += 1
    },
    GetSystemCompetition () {
      this.systemCompetition = Object.entries(Functions.GetSystemCompetition(0))
      this.groups = Constants.GROUPS
    },
    async LoadRegions () {
      const response = await RegionsService.LoadRegions()
      this.regions = response.data.regions
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

      await GenerateService.GenerateRankings({
        user: this.$session.get('User')
      })

      for (var key in this.systemCompetition) {
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
          const gc = await GenerateService.GenerateGroups(data)
          if (gc.status === 200) {
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
          this.forceUpdate()
        )
      }
    }
  }
}
</script>

<style scoped>

</style>
