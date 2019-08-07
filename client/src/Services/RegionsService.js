import Api from '@/Services/Api'

export default {
  LoadRegions () {
    return Api().get('regions')
  }
}
