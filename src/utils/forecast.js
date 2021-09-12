const request = require('request')

const forecast = (latitude, longitude, location, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=cf7e326cc1d79215ac48e1862ff2c0f4&query='+latitude+','+longitude
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Ocorreu um problema de conexão, tente novamente.')
        }
        else if (body.error) {
            callback('Não foi possível encontrar a localização informada, tente novamente.')
        }
        else {
           callback(undefined, 'A previsão do tempo para '+location+' é de '+body.current.temperature+ ' graus.\n A chance de precipitação é de '+ body.current.precip+'%.Atualmente o clima está '+body.current.weather_descriptions+'.')
           }
            
        
    })
}
module.exports = forecast