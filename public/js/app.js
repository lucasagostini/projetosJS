
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#msg1')
const messageTwo = document.querySelector('#msg2')

console.log(weatherForm)

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent ='Carregando...'
    messageTwo.textContent = ' '
    fetch('http://localhost:8080/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            }
            else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecastData
                //console.log(data.forecast)
                //console.log(data)

            }

        })

    })
})