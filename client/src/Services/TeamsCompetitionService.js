import Api from '@/Services/Api'

export default {
  generatePreQ (data) {
    return Api().post('teamscompetition', data)
  }
}
