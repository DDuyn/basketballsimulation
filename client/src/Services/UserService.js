import Api from '@/Services/Api'

export default {
  login (user) {
    return Api().post('login', user)
  }
}
