<template>
<div>
  <section class="hero">
    <div class="hero-body">
      <div class="tile is-ancestor">
        <h3 class="title">{{systemCompetition.Name}} - Season {{this.$session.get('Season')}}</h3>
      </div>
    </div>
  </section>
  <section>
    <b-tabs v-model="activeTab" size="is-medium" position="is-right" @change="onTabChange">
      <b-tab-item v-for="index in systemCompetition.NumberGroups" :key="index" :label="letters[index-1]" icon="format-list-bulleted">
        <b-table :data="teams" :row-class="getRow">
          <template slot-scope="props">
            <b-table-column :field="columns.field" :label="columns.label" v-for="(columns, i) in columns" :key="i" v-if="props.row[6] == letters[index-1]">
              {{ props.row[i] }}
            </b-table-column>
          </template>
        </b-table>
        <section>
            <div class="hero">
                <div class="hero-body">
                    <b-collapse class="card">
                        <div class="card-content">
                            <div class="content">
                                <div >
                                  <section>
                                    <b-taglist attached>
                                      <b-tag type="is-dark">Round</b-tag>
                                      <b-tag type="is-danger">{{ round }}</b-tag>
                                    </b-taglist>
                                    <b-table
                                      :data="group"
                                      :paginated="isPaginated"
                                      :per-page="perPage"
                                      :current-page.sync="currentPage"
                                      :pagination-simple="isPaginationSimple"
                                      :pagination-position="paginationPosition"
                                      @page-change="onPageChange"
                                    >
                                      <template slot-scope="props">
                                          <b-table-column field="PointsHome" label="Points Home">
                                            <b-tag type="is-dark">{{props.row.PointsHome}}</b-tag>
                                          </b-table-column>
                                          <b-table-column field="Home" label="Home">
                                            {{props.row.Home}}
                                          </b-table-column>
                                          <b-table-column>
                                            <b-tag type="is-danger">vs</b-tag>
                                          </b-table-column>
                                          <b-table-column filed="Away" label="Away">
                                            {{props.row.Away}}
                                          </b-table-column>
                                          <b-table-column field="PointsAway" label="Points Away">
                                            <b-tag type="is-dark">{{props.row.PointsAway}}</b-tag>
                                          </b-table-column>
                                      </template>
                                    </b-table>
                                  </section>
                                </div>
                            </div>
                        </div>
                    </b-collapse>
                </div>
            </div>
        </section>
      </b-tab-item>
    </b-tabs>
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
      isPaginated: true,
      isPaginationSimple: true,
      paginationPosition: 'bottom',
      currentPage: 1,
      perPage: 5,
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
      teams: [],
      group: [],
      round: 1
    }
  },
  mounted () {
    this.GetSystemCompetition()
    this.getGroupsByComp()
    this.getMatchesByGroup()
  },
  methods: {
    onTabChange (index) {
      this.group = this.matches.filter(x => x.Group === this.letters[index])
    },
    onPageChange (page) {
      this.round = page
    },
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
    },
    async getMatchesByGroup () {
      const response = await MatchesService.getMatchesByGroup({
        competition: this.$route.params.codeCompetition,
        user: this.$session.get('User'),
        season: this.$session.get('Season')
      })
      this.perPage = this.systemCompetition.NumberTeamsByGroup / 2
      this.group = response.data.Matches.filter(x => x.Group === this.letters[0])
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
.tag:not(body) {
  font-size: 18px;
}
</style>
