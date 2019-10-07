<template>
<div>
  <section class="hero">
    <div class="hero-body">
      <div class="container has-text-left">
        <h3 class="title">{{systemCompetition.Name}} - Season {{this.$session.get('Season')}}</h3>
        <hr/>
      </div>
    </div>
  </section>
  <section>
    <b-tabs v-model="activeTab" size="is-medium" position="is-right">
      <b-tab-item v-for="index in systemCompetition.NumberGroups" :key="index" :label="letters[index-1]" icon="format-list-bulleted">
        <b-table :data="teams" :row-class="getRow">
          <template slot-scope="props">
            <b-table-column :field="columns.field" :label="columns.label" v-for="(columns, i) in columns" :key="i" v-if="props.row[6] == letters[index-1]">
              {{ props.row[i] }}
            </b-table-column>
          </template>
        </b-table>
      </b-tab-item>
    </b-tabs>
  </section>
  <section>
      <ul v-for="match in matches" :key="match.Match">
          <li>{{match.Home}} vs {{match.Away}}</li>
      </ul>
  </section>
</div>
</template>

<script>
import CompetitionsGroupService from '@/Services/CompetitionsGroupService'
import MatchesService from '@/Services/MatchesService'
var Functions = require('../../../../server/functions/functions')
var Constants = require('../../../../server/functions/constants')
export default {
  name: 'CompetitionGroups',
  data () {
    return {
      groups: [],
      matches: [],
      systemCompetition: [],
      letters: [],
      activeTab: 0,
      columns: [
        {
          field: 'Position',
          label: '#'
        },
        {
          field: 'Team',
          label: 'Team'
        },
        {
          field: 'Wins',
          label: 'Wins'
        },
        {
          field: 'Losses',
          label: 'Losses'
        },
        {
          field: 'PointsFavour',
          label: 'P. Favour'
        },
        {
          field: 'PointsAgainst',
          label: 'P. Against'
        }
      ],
      teams: []
    }
  },
  mounted () {
    this.GetSystemCompetition()
    this.getGroupsByComp()
    this.getMatchesByGroup()
  },
  methods: {
    GetSystemCompetition () {
      this.systemCompetition = Functions.GetSystemCompetition(parseInt(this.$route.params.codeCompetition))
      this.letters = Constants.GROUPS
    },
    async getGroupsByComp () {
      const response = await CompetitionsGroupService.getGroupsByCompetition({
        codeCompetition: this.$route.params.codeCompetition,
        user: this.$session.get('User'),
        season: this.$session.get('Season')
      })
      for (let key in response.data.groups) {
        var item = response.data.groups[key]
        this.teams.push([
          item.Position,
          item.Team,
          item.Wins,
          item.Losses,
          item.PointsFavour,
          item.PointsAgainst,
          item.Group
        ])
      }
      this.groups = response.data.groups
    },
    async getMatchesByGroup () {
      const response = await MatchesService.getMatchesByGroup({
        competition: this.$route.params.codeCompetition,
        user: this.$session.get('User'),
        season: this.$session.get('Season')
      })
      console.log(response.data.Matches)
      this.matches = response.data.Matches
    },
    getRow (row) {
      if (row[0] <= this.systemCompetition.NumberTeamsClassifiedByGroup) return 'is-classified'
      if (this.systemCompetition.NumberTeamsClassifiedByGroupLoser !== 0) {
        if (row[0] > this.systemCompetition.NumberTeamsClassifiedByGroup && row[0] <= this.systemCompetition.NumberTeamsClassifiedByGroup + this.systemCompetition.NumberTeamsClassifiedByGroupLoser) return 'is-loser'
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
hr{
  background-color: #ff3860;
}
</style>
