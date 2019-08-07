<template>
    <div>

    </div>
</template>

<script>
import CountriesService from '@/Services/CountriesService'

export default {
    name: 'ListCountries',
    data () {
        return  {
            countries: []
        }
    },
    mounted () {
        this.getCountries()
    },
    methods: {
        async getCountries () {
            const response = await CountriesService.getCountries()
            console.log(response)
        }
    }
}
</script>

<style scoped>

</style>
