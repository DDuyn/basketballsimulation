import Api from '@/Services/Api'

export default {
  GenerateRankings (data) {
    return Api().post('generateRanking', data)
  },
  GenerateTeamsCompetition (data) {
    return Api().post('generateTeamsCompetition', data)
  },
  GenerateGroups (data) {
    return Api().post('generateGroups', data)
  },
  GenerateMatches (data) {
    return Api().post('generateMatches', data)
  }
}
