var User = require('../models/User')
var Common = require('../functions/Common')
var Enum = require('../functions/Enum')
var bcrypt = require('bcrypt')

module.exports = {
    async Login (req, res) {      
        let email = req.body.email
        let password = req.body.password

        let Model = Common.GetModel(Enum.MODELS.USER)
        let Filter = {Email: email, Password: password}
        let user = await Common.FindOne(Common.Query(Model, Filter))
        if (user) {           
            res.send({
                Status: 200,
                User: user
            })
        }else{            
            res.send({                
                Status: 404,
                User: null
            })
        }
    },

    async Register (req, res) {

        let userName = req.body.userName
        let password = req.body.password
        let email = req.body.email

        var BCRYPT_SALT_ROUNDS = 12
        bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
            .then(hashPassword => {
                let Model = Common.GetModel(Enum.MODELS.USER)
                let Order = {sort: { _id: -1 }}
                
            })

        User.findOne({}, {}, { sort: { _id: -1 } }, (error, code) => {
            if (error) console.error('Register - Last Code', error)
            
            if (code !== null) newCode = code.Code + 1
            else newCode = 1

            const user = new User()
            user.Name = userName
            user.Email = email
            user.Password = password
            user.Code = newCode
            user.CurrentSeason = 1
            user.Generated = 0
    
            user.save((error, response) => {
                if (error) console.error('Register', error)
    
                res.send({
                    Success: 'Save Succesfully'
                })
            })
        })
    },

    async UpdateGeneratedAndSeason (req, res) {
        let email = req.body.email
        let generated = req.body.generated
        let currentseason = req.body.currentseason

        var filter = { Email: email }
        var query = {
            $set: {
                CurrentSeason: currentseason,
                Generated: generated
            }
        }
        var options = { new: true }

        User.findOneAndUpdate(filter, query, options, (error, user) => {
            if (error) console.error('Update User', error)
            res.send({
                User: user
            })
        })
    }
}