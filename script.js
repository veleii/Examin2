const mercury = document.querySelector(".mercury")
const venus = document.querySelector(".venus")
const earth = document.querySelector(".earth")
const mars = document.querySelector(".mars")
const jupiter = document.querySelector(".jupiter")
const saturn = document.querySelector(".saturn")
const uranus = document.querySelector(".uranus")
const neptune = document.querySelector(".neptune")
const sun = document.querySelector(".sun")

/* under är chattis kod */
sun.addEventListener('click', () => handlePlanetClick('sun'));
mercury.addEventListener('click', () => handlePlanetClick('Mercury'));
venus.addEventListener('click', () => handlePlanetClick('Venus'));
earth.addEventListener('click', () => handlePlanetClick('Earth'));
mars.addEventListener('click', () => handlePlanetClick('Mars'));
jupiter.addEventListener('click', () => handlePlanetClick('Jupiter'));
saturn.addEventListener('click', () => handlePlanetClick('Saturn'));
uranus.addEventListener('click', () => handlePlanetClick('Uranus'));
neptune.addEventListener('click', () => handlePlanetClick('Neptune'));

const handlePlanetClick = async (planetName) => {
    try {
        // Hämta API-nyckeln först
        const keyResponse = await getKey('POST', '/keys');
        const key = keyResponse.key;

        // Hämta planetdata
        const planetsData = await getPlanets('GET', '/bodies', key);

        // Filtrera data för rätt planet
        const planetInfo = planetsData.find(planet => planet.name === planetName);

        // Visa planetinfo
        if (planetInfo) {
            displayPlanetInfo(planetInfo);
        } else {
            console.error('Planet not found');
        }
    } catch (error) {
        console.error('Error fetching planet data:', error);
    }
}

// Funktion för att visa planetens info i HTML
const displayPlanetInfo = (planetInfo) => {
    const infoContainer = document.querySelector('.planet-info'); // En div för att visa info
    infoContainer.innerHTML = `
        ${planetInfo.name}
        ${planetInfo.mass}
        ${planetInfo.radius}
        ${planetInfo.distance}
        ${planetInfo.description}
    `;
};

/* över är chattis kod */

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


/* Dag 2 

Dölj sida 1 när du klickar.
se till att rätt info kommer ut */


