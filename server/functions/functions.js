var SystemCompetition = require('../functions/systemCompetitions')
module.exports = {
    GetSliceCompetition: function GetSliceCompetition (codeCompetition) {
            let slice = 0
            switch (codeCompetition) {
                case "4":
                    slice = 9                           
                    break
                case "5":
                    slice = 5
                    break
                case "6":
                    slice = 4
                    break
                case "7":
                    slice = 3
                    break
            }
            
            return slice
        },

    ShuffleTeams: function ShuffleTeams (array) {
        let currentIndex = array.length

        while(0 !== currentIndex) {
            let randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1

            let tmpValue = array[currentIndex]
            array[currentIndex] = array[randomIndex]
            array[randomIndex] = tmpValue
        }

        return array
    },

    GetSystemCompetition: function GetSystemCompetition (codeCompetition) {
        let objCompetition = []
        switch (codeCompetition) {
            case 4:
                objCompetition = SystemCompetition.PreQualifierEuroBasket
                break;
            case 5:
                objCompetition = SystemCompetition.PreQualifierAmeriCup
                break;
            case 6:
                objCompetition = SystemCompetition.PreQualifierAsiaCup
                break;
            case 7:
                objCompetition = SystemCompetition.PreQualifierAfricanBasket
                break;
            case 0: 
                objCompetition = SystemCompetition
                break;
        }

        return objCompetition
    },

    HandleErrors: function HandleErrors (method, model, error) {
       message = error.message.replace(`${model} validation failed: `, '')
       if (error.name === 'ValidationError') console.error(`Error in ${method}: ${message}`)

    }
}
