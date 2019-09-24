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

    },

    RotateTeams: function RotateTeams (teams) {
        
        let factor = (teams.length % 2 === 0 ? teams.length / 2 : (teams.length / 2) + 1)
        let topRightIndex = factor - 1
        let topRightItem = teams[topRightIndex]
        let botLeftIndex = factor
        let botLeftItem = teams[botLeftIndex]
  
        for(var x = topRightIndex; x > 0; x--) {
          teams[x] = teams[x - 1]
        }
  
        for(var x = botLeftIndex; x < teams.length -1; x++) {
          teams[x] = teams[x + 1]
        }

        teams[1] = botLeftItem
        teams[teams.length - 1] = topRightItem
    }
}
