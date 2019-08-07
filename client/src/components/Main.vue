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
          <v-btn class="ma-2" outlined color="indigo" @click="Generate">Generate Competition</v-btn>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import RegionsService from '@/services/RegionsService'
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
  },
  methods: {
    async LoadRegions () {
      const response = await RegionsService.LoadRegions()
      this.regions = response.data.regions
      console.log('Regions', response.data.regions)
    },
    async Generate () {

    }
  }

}
</script>

<style scoped>

</style>
