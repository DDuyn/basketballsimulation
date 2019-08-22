<template>
  <v-container fluid grid-list-xs>
    <v-layout row wrap>
      <v-flex xs12>
        <h3>PreQualifiers EuroBasket - 2019</h3>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 v-for="index in systemCompetition.NumberGroups" :key="index">
        <h4 class="textLeft">Group {{letters[index-1]}}</h4>
        <v-simple-table>
          <thead>
            <tr>
              <th>Team</th>
              <th>Wins</th>
              <th>Losses</th>
              <th>Points Favour</th>
              <th>Points Against</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="group in groups" :key="group._id">
              <th class="thNameTeam" v-if="group.Group == letters[index-1]">
               <img class="img-circle" :src="require(`../../assets/flags/${group.CodeTeam}.svg`)" height="25px" width="25px">
               <span>{{group.Team}}</span>
              </th>
              <th class="thNameTeam" v-if="group.Group == letters[index-1]">{{group.Wins}}</th>
              <th class="thNameTeam" v-if="group.Group == letters[index-1]">{{group.Losses}}</th>
              <th class="thNameTeam" v-if="group.Group == letters[index-1]">{{group.PointsFavour}}</th>
              <th class="thNameTeam" v-if="group.Group == letters[index-1]">{{group.PointsAgainst}}</th>
            </tr>
          </tbody>
        </v-simple-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CompetitionsGroupService from '@/Services/CompetitionsGroupService'
var Functions = require('../../../../server/functions/functions')
var Constants = require('../../../../server/functions/constants')
export default {
  name: 'Competition',
  data () {
    return {
      groups: [],
      systemCompetition: [],
      letters: []
    }
  },
  mounted () {
    this.GetSystemCompetition()
    this.getGroupsByComp()
  },
  methods: {
    GetSystemCompetition () {
      this.systemCompetition = Functions.GetSystemCompetition(parseInt(this.$route.params.codeCompetition))
      this.letters = Constants.GROUPS
    },
    async getGroupsByComp () {
      const response = await CompetitionsGroupService.getGroupsByCompetition(this.$route.params.codeCompetition)
      console.log(response.data)
      this.groups = response.data.groups
    }
  }
}
</script>

<style scoped>
tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, .05);
}
.textLeft {
  text-align: left;
}
.thNameTeam {
  width: 570px;
}
.thNameTeam span {
 margin-left: 7px;
}
.thNameTeam .img-circle {
  border-radius: 25px;
  position: relative;
  top: 6px;
}
</style>
