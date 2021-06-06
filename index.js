const parse = require('csv-parse');
const fs = require('fs');

const habitablePlanets = [];

const isHabitablePlanet = (planet) => {
    return planet["koi_disposition"] === "CONFIRMED"
        && planet["koi_insol"] > 0.36
        && planet["koi_insol"] < 1.11
        && planet["koi_prad"] < 1.6
}

fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment: "#",
        columns: true
    }))
    .on('data', (chunk) => {
        if (isHabitablePlanet(chunk)) {
            habitablePlanets.push(chunk)
        }
    })
    .on('error', (err) => {
        console.log(`Error Occured ${err}`)
    })
    .on('end', () => {
        console.log(habitablePlanets.map((planet) => planet["kepler_name"]))
        console.log(`${habitablePlanets.length} Planet found`);
        console.log('done');
    })