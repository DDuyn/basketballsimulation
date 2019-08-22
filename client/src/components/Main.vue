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
          <v-btn class="ma-2" outlined color="indigo" >Generate Competition</v-btn>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import RegionsService from '@/services/RegionsService'
import CompetitionsGroupService from '@/Services/CompetitionsGroupService'
import TeamCompetitionService from '@/Services/TeamsCompetitionService'
export default {
  name: 'Main',
  data () {
    return {
      regions: [],
      selectedRegion: []
    }
  },
  mounted () {
    this.LoadRegions()
    this.getGroupsByCompetition()
    this.generatePreQ()
  },
  methods: {
    async LoadRegions () {
      const response = await RegionsService.LoadRegions()
      this.regions = response.data.regions
      console.log('Regions', response.data.regions)
    },
    async getGroupsByCompetition () {
      const response = await CompetitionsGroupService.getGroupsByCompetition(4)
      console.log(response)
    },
    async generatePreQ () {
      const tc = await TeamCompetitionService.generatePreQ({
        region: 'EU',
        competition: 4,
        user: this.$session.get('User')
      })

      if (tc.status === 200) {
        const cg = await CompetitionsGroupService.generatePreQ({
          competition: 4,
          user: this.$session.get('User'),
          season: this.$session.get('Season')
        })
        console.log(cg)
      }
    }
  }
}
</script>

<style scoped>

</style>
