var Region = require('../models/Region')

module.exports = {
    async LoadRegions (req, res) {
        Region.find({}, ((error, regions) => {
            if (error) console.error('LoadRegions', error)
            res.send({
                regions: regions
            })
        }))
    }
}