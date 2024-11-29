/*main script*/
import { elements } from "./elements.js";
import { getKey, getPlanets} from "./api.js";

const handlePlanetClick = async (planetName) => {
    try {
        const key = await getKey("/keys");
        const data = await getPlanets("/bodies", key);
        const selectedPlanet = data.bodies.find(body => body.name === planetName);

        if (selectedPlanet) {
            console.log(selectedPlanet);
            elements.infoPage.style.display = 'block';
            elements.background.style.display = 'block';
            elements.earth1.style.display = 'block';
            elements.startPage.style.display = 'none'; 

            displayInfo(selectedPlanet)

        } else {
            console.error('Planet not found');
        }
    } catch (error) {
        console.error(error);
    }
}

const returnToStartPage = () => {
    elements.infoPage.style.display = 'block';
    elements.background.style.display = 'block';
    elements.earth1.style.display = 'none';
    elements.earth2.style.display = 'none';
    elements.earth3.style.display = 'none';
    elements.startPage.style.display = 'grid';
    elements.infoPage.style.display = 'none';
    elements.background.style.display = 'none';
}

const displayInfo = (bodyInfo) => {
    elements.name.textContent = bodyInfo.name.toUpperCase();
    elements.latinName.textContent = bodyInfo.latinName.toUpperCase();
    elements.artInfo.textContent = bodyInfo.desc;
    elements.circumference.textContent = `${bodyInfo.circumference.toLocaleString()} Km`;
    elements.fromSun.textContent = `${bodyInfo.distance.toLocaleString()} Km`;
    elements.maxTemp.textContent = `${bodyInfo.temp.day}°C`;
    elements.minTemp.textContent = `${bodyInfo.temp.night}°C`;

    if (bodyInfo.moons.length === 0) {
        elements.moons.textContent = `Denna planet har inga månar.`;
    } else { 
        elements.moons.textContent = bodyInfo.moons.join(", ");
    }
}

elements.mercury.addEventListener('click', () => handlePlanetClick('Merkurius'));
elements.venus.addEventListener('click', () => handlePlanetClick('Venus'));
elements.earth.addEventListener('click', () => handlePlanetClick('Jorden'));
elements.mars.addEventListener('click', () => handlePlanetClick('Mars'));
elements.jupiter.addEventListener('click', () => handlePlanetClick('Jupiter'));
elements.saturn.addEventListener('click', () => handlePlanetClick('Saturnus'));
elements.uranus.addEventListener('click', () => handlePlanetClick('Uranus'));
elements.neptune.addEventListener('click', () => handlePlanetClick('Neptunus'));
elements.sun.addEventListener('click', () => handlePlanetClick('Solen'));

elements.earth1.addEventListener('click', returnToStartPage);
elements.earth2.addEventListener('click', returnToStartPage);
elements.earth3.addEventListener('click', returnToStartPage);

