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
        <b-table :data="teams">
          <template slot-scope="props">
            <b-table-column :field="columns.field" :label="columns.label" v-for="(columns, i) in columns" :key="i" v-if="props.row[5] == letters[index-1]">
              {{ props.row[i] }}
            </b-table-column>
          </template>
        </b-table>
      </b-tab-item>
    </b-tabs>
  </section>
</div>
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
      letters: [],
      activeTab: 0,
      columns: [
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
          item.Team,
          item.Wins,
          item.Losses,
          item.PointsFavour,
          item.PointsAgainst,
          item.Group
        ])
      }
      this.groups = response.data.groups
    }
  }
}
</script>

<style scoped>
    tr.is-info {
        background: #167df0;
        color: #fff;
    }
hr{
  background-color:#ff3860;
}
</style>
