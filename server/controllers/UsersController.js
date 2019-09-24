var User = require('../models/User')


module.exports = {
    async Login (req, res) {
       console.log(req.body)
        let email = req.body.email
        let password = req.body.password

        User.find({Email: email, Password: password}, (error, user) => {
            if (error) console.error('Login', error)

            res.send({
                CodeUser: user[0].Code,
                CurrentSeason: user[0].CurrentSeason,
                Generated: user[0].Generated,
                Email: user[0].Email
            })

        })
    },

    async Register (req, res) {

        let userName = req.body.userName
        let password = req.body.password
        let email = req.body.email

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