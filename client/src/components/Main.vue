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
export default {
  name: 'Main',
  data () {
    return {
      regions: [],
      selectedRegion: [],
      componentKey: 0
    }
  },
  mounted () {
    this.LoadRegions()
  },
  methods: {
    forceUpdate () {
      this.componentKey += 1
    },
    async LoadRegions () {
      const response = await RegionsService.LoadRegions()
      this.regions = response.data.regions
      console.log('Regions', response.data.regions)
    },
    async Generate () {
      await GenerateService.Generate({
        generateRanking: 1,
        region: 'EU',
        competition: 4,
        user: this.$session.get('User'),
        season: this.$session.get('Season')
      }).catch(error => console.error('Generate EU', error))

      await GenerateService.Generate({
        generateRanking: 0,
        region: 'AF',
        competition: 7,
        user: this.$session.get('User'),
        season: this.$session.get('Season')
      }).catch(error => console.error('Generate AF', error))

      await GenerateService.Generate({
        generateRanking: 0,
        region: 'AM',
        competition: 5,
        user: this.$session.get('User'),
        season: this.$session.get('Season')
      }).catch(error => console.error('Generate AM', error))

      await GenerateService.Generate({
        generateRanking: 0,
        region: 'AS',
        competition: 6,
        user: this.$session.get('User'),
        season: this.$session.get('Season')
      }).catch(error => console.error('Generate AM', error))

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
</script>

<style scoped>

</style>
