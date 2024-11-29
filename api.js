export const getKey = async (endpoint) => {
    const url = 'https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com' + endpoint

    const options = {
            method: `POST`
    }

    try {

        let respons = await fetch (url, options)
        let data = await respons.json()
        return data

    } catch(error) {
        console.log(error);
        
    }
}

export const getPlanets = async (endpoint, key) => {
    const url = 'https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com' + endpoint

    const options = {
        "method": `GET`,
        "headers": {
            'x-zocom' : `${key.key}`
        }
    } 

    const bodiesData = await fetch(url, options)
    const bodiesDataJson = await bodiesData.json()
    return bodiesDataJson
}
