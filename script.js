/* const mercury = document.querySelector(".mercury")
const venus = document.querySelector(".venus")
const earth = document.querySelector(".earth")
const mars = document.querySelector(".mars")
const jupiter = document.querySelector(".jupiter")
const saturn = document.querySelector(".saturn")
const uranus = document.querySelector(".uranus")
const neptune = document.querySelector(".neptune")

mercury.addEventListener("click")
venus.addEventListener("click")
earth.addEventListener("click")
mars.addEventListener("click")
jupiter.addEventListener("click")
saturn.addEventListener("click")
uranus.addEventListener("click")
neptune.addEventListener("click") */


const getKey = (apiType, endpoint) => {
    const url = 'https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com' + endpoint

    const options = {
            method: apiType
    }

    fetch(url, options).then(res => {
        
        return res.json()
    }).then(res => {
   console.log(res);
   
   getPlanets('GET', '/bodies', res.key); 
   
    })
}

const getPlanets = async (apiType, endpoint, key) => {
    const url = 'https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com' + endpoint

    const options = {
        method: apiType,
        headers: {
            'x-zocom' : key
        }
}

const bodiesData = await fetch(url, options)
const bodiesDataJson = await bodiesData.json()

console.log(bodiesDataJson);
}
getKey('POST', '/keys')



