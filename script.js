const mercury = document.querySelector(".mercury")
const venus = document.querySelector(".venus")
const earth = document.querySelector(".earth")
const mars = document.querySelector(".mars")
const jupiter = document.querySelector(".jupiter")
const saturn = document.querySelector(".saturn")
const uranus = document.querySelector(".uranus")
const neptune = document.querySelector(".neptune")
const sun = document.querySelector(".sun")

mercury.addEventListener('click', () => handlePlanetClick('Merkurius'));
venus.addEventListener('click', () => handlePlanetClick('Venus'));
earth.addEventListener('click', () => handlePlanetClick('Jorden'));
mars.addEventListener('click', () => handlePlanetClick('Mars'));
jupiter.addEventListener('click', () => handlePlanetClick('Jupiter'));
saturn.addEventListener('click', () => handlePlanetClick('Saturnus'));
uranus.addEventListener('click', () => handlePlanetClick('Uranus'));
neptune.addEventListener('click', () => handlePlanetClick('Neptunus'));
sun.addEventListener('click', () => handlePlanetClick('Solen'));

document.querySelector('.earth1').addEventListener('click', returnToStartPage);
document.querySelector('.earth2').addEventListener('click', returnToStartPage);
document.querySelector('.earth3').addEventListener('click', returnToStartPage);

const getKey = async (endpoint) => {
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

const getPlanets = async (endpoint, key) => {
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

const handlePlanetClick = async (planetName) => {
    try {
        const key = await getKey("/keys");
        const data = await getPlanets("/bodies", key);
        const selectedPlanet = data.bodies.find(body => body.name === planetName);

        if (selectedPlanet) {
            console.log(selectedPlanet);
            
            document.querySelector('.info-page').style.display = 'block';
            document.querySelector('.background').style.display = 'block';
            document.querySelector('.earth1').style.display = 'block';
            document.querySelector('.start-page').style.display = 'none'; 

            displayInfo(selectedPlanet)

        } else {
            console.error('Planet not found');
        }
    } catch (error) {
        console.error(error);
    }
}

function returnToStartPage() {
    document.querySelector('.info-page').style.display = 'block';
    document.querySelector('.background').style.display = 'block';
    document.querySelector('.earth1').style.display = 'none';
    document.querySelector('.earth2').style.display = 'none';
    document.querySelector('.earth3').style.display = 'none';
    document.querySelector('.start-page').style.display = 'grid';
    document.querySelector('.info-page').style.display = 'none';
    document.querySelector('.background').style.display = 'none';
}

const displayInfo = (bodyInfo) => {
    
    document.querySelector('.name').textContent = bodyInfo.name.toUpperCase();
    document.querySelector('.latinName').textContent = bodyInfo.latinName.toUpperCase();
    document.querySelector('.artInfo').textContent = bodyInfo.desc;
    document.querySelector('.circumference').textContent = `${bodyInfo.circumference.toLocaleString()} Km`;
    document.querySelector('.fromSun').textContent = `${bodyInfo.distance.toLocaleString()} Km`;
    document.querySelector('.maxTemp').textContent = `${bodyInfo.temp.day}°C`;
    document.querySelector('.minTemp').textContent = `${bodyInfo.temp.night}°C`;

    if (bodyInfo.moons.length === 0) {
        document.querySelector('.moons').textContent = `Denna planet har inga månar.`;
    } else { 
        document.querySelector('.moons').textContent = bodyInfo.moons.join(", ");
    }
}

