const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWdvc3RpbmlsdWNhc2IiLCJhIjoiY2t0ZzVmd2V3MGV5YjJvcWYxZHR5ZHV3dyJ9.Oz9756n-n3sEaR5wwNzAzQ&limit=1'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Ocorreu um problema de conexão, tente novamente.')
        }
        else if (body.features.length === 0) {
            callback('Não foi possível encontrar a localização informada, tente novamente.')
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
