<template>
    <div>

    </div>
</template>

<script>
import CountriesService from '@/Services/CountriesService'
import CompetitionsGroupService from '@/Services/CompetitionsGroupService'

export default {
    name: 'ListCountries',
    data () {
        return  {
            countries: []
        }
    },
    mounted () {
        this.getGroupsByCompetition()
    },
    methods: {
        async getGroupsByCompetition () {
            const response = await CompetitionsGroupService.getGroupsByCompetition(4)
            console.log(response)
        }
    }
}
</script>

<style scoped>

</style>
