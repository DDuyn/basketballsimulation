import Api from '@/Services/Api'

export default {
  Generate (data) {
    return Api().post('generate', data)
  }
}
