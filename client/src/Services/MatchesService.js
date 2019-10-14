import Api from '@/Services/Api'

export default {
  getMatchesByGroup (data) {
    var params = {Competition: data.competition, User: data.user, Season: data.season}
    return Api().get(`matches`, {params})
  }
}
