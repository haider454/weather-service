const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/7581307e7221cc9a56fff16b0089516e/' + latitude + ',' + longitude + '?units=si'
    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to get location data for those coordinates. Try again!', undefined)
        } else {
            const data = body.currently
            const dailyData = body.daily.data
            const result = dailyData[0].summary + " It is currently " + data.temperature + " degrees out. There is a " + data.precipProbability + "% chance of rain"
            callback(undefined, result)
        }
    })
}

module.exports = forecast