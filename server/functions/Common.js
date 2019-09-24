var CompetitionGroup = require('../models/CompetitionGroup')
var Ranking = require('../models/Ranking')
var Region = require('../models/Region')
var Team = require('../models/Team')
var User = require('../models/User')
var TeamCompetition = require('../models/TeamCompetition')
var Functions = require('./functions')
var Enum = require('./Enum')

module.exports = {
    GetModel: function GetModel (Model) {
        let model = 'undefined'

        switch (Model) {
            case Enum.MODELS.COMPETITIONGROUP:
                model = CompetitionGroup
                break
            case Enum.MODELS.RANKING:
                model = Ranking
                break
            case Enum.MODELS.REGION:
                model = Region
                break
            case Enum.MODELS.TEAM:
                model = Team
                break
            case Enum.MODELS.USER:
                model = User
                break
            case Enum.MODELS.TEAMCOMPETITION:
                model = TeamCompetition
                break
        }

        return model
    },

    Query: function Query (Model, Filter, Order) {
        return Query = {
            Model: Model,
            Filter: Filter,
            Order: Order
        }
    },

    Find: function Find (Query) {
        return Query.Model.find(Query.Filter, {}, Query.Order)
            .then(data => { return data })
            .catch(e => Functions.HandleErrors(`Get ${Query.Model.modelName}`, Query.Model.modelName, e))
    }
}