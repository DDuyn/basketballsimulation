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
    }
  }

}
</script>

<style scoped>

</style>
