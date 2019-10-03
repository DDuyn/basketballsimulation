var User = require('../models/User')
var Common = require('../functions/Common')
var Enum = require('../functions/Enum')
var bcrypt = require('bcrypt')

module.exports = {
    async Login(req, res) {
        let email = req.body.email
        let password = req.body.password

        let Model = Common.GetModel(Enum.MODELS.USER)
        let Filter = { Email: email }
        let user = await Common.FindOne(Common.Query(Model, Filter))
        
        if (user) {
            let samePassword = await bcrypt.compare(password, user.Password)                           
            if (samePassword) {
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

        } else {
            res.send({
                Status: 404,
                User: null
            })
        }
    },

    async Register(req, res) {

        let userName = req.body.userName
        let password = req.body.password
        let email = req.body.email

        var BCRYPT_SALT_ROUNDS = 12
        bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
            .then(hashPassword => {
                let Model = Common.GetModel(Enum.MODELS.USER)
                let Filter = { Email: email }
                let Order = { sort: { _id: -1 } }
                Common.FindOne(Common.Query(Model, Filter))
                    .then(user => {
                        if (user) {
                            res.send({
                                Status: 409,
                                User: user
                            })
                        } else {
                            Common.FindOne(Common.Query(Model, {}, Order))
                                .then(user => {
                                    if (user) newCode = user.Code + 1
                                    else newCode = 1
        
                                    const newUser = new User()
                                    newUser.Name = userName
                                    newUser.Email = email
                                    newUser.Password = hashPassword
                                    newUser.Code = newCode
                                    newUser.CurrentSeason = 1
                                    newUser.Generated = 0
        
                                    newUser.save((error, user) => {
                                        if (error) console.error('Register', error)
                                        res.send({
                                            Status: 200,
                                            Success: 'Saved Succesfully',
                                            User: user
                                        })
                                    })
                                })
                            }
                    })
            })
    },

    async UpdateGeneratedAndSeason(req, res) {
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