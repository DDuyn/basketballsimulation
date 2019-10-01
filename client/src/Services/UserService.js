import Api from '@/Services/Api'

export default {
  login (user) {
    return Api().post('login', user)
  },
  register (user) {
    return Api().post('register', user)
  },
  updateGeneratedSeason (user) {
    return Api().put('update', user)
  }
}
