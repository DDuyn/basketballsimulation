import Api from '@/Services/Api'

export default {
  getGroupsByCompetition (codeCompetition) {
    return Api().get('competitionsgroups/' + codeCompetition, codeCompetition)
  },
  generatePreQ (data) {
    return Api().post('competitiongroups', data)
  }
}
