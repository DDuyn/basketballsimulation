import Api from '@/Services/Api'

export default {
    getCountries () {
        return Api().get('countries')
    },

    loadCountries () {
        return Api().post('countries')
    }
}