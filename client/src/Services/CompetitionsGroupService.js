import Api from '@/Services/Api'

export default {
  getGroupsByCompetition (data) {
    var params = { user: data.user, season: data.season }
    return Api().get(`competitionsgroups/${data.codeCompetition}`, {params})
  }
}
