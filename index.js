const express = require('express');

// Define a Ship class
class Ship {
  constructor(name, side, health, damage) {
    this.name = name;
    this.side = side;
    this.health = health;
    this.damage = damage;
  }

  // Attack another ship and reduce its health
  attack(ship) {
    console.log(`${this.name} attacks ${ship.name} for ${this.damage} damage.`);
    ship.health -= this.damage;
    console.log(`${ship.name} has ${ship.health} health remaining.\n`);
  }

  // Check if the ship is still alive
  isAlive() {
    return this.health > 0;
  }
}

// Create two arrays to store the ships of the Romulan and Federation fleets
const romulanFleet = [
  new Ship('Romulan Ship 1', 'Romulan', 100, 20),
  new Ship('Romulan Ship 2', 'Romulan', 100, 20),
  new Ship('Romulan Ship 3', 'Romulan', 100, 20),
  new Ship('Romulan Ship 4', 'Romulan', 100, 20),
  new Ship('Romulan Ship 5', 'Romulan', 100, 20)
];

const federationFleet = [
  new Ship('Federation Ship 1', 'Federation', 100, 20),
  new Ship('Federation Ship 2', 'Federation', 100, 20),
  new Ship('Federation Ship 3', 'Federation', 100, 20),
  new Ship('Federation Ship 4', 'Federation', 100, 20),
  new Ship('Federation Ship 5', 'Federation', 100, 20)
];

// Battle management algorithm
function battle() {
  let round = 1;
  while (romulanFleet.length > 0 && federationFleet.length > 0) {
    console.log(`Round ${round} begins...\n`);

    // Romulan fleet attacks first
    for (let i = 0; i < romulanFleet.length; i++) {
      const romulanShip = romulanFleet[i];
      const federationShip = federationFleet[Math.floor(Math.random() * federationFleet.length)];
      romulanShip.attack(federationShip);

      // Remove destroyed ships from the fleet
      if (!federationShip.isAlive()) {
        console.log(`${federationShip.name} has been destroyed!`);
        federationFleet.splice(federationFleet.indexOf(federationShip), 1);
      }
    }

    // Federation fleet attacks second
    for (let i = 0; i < federationFleet.length; i++) {
      const federationShip = federationFleet[i];
      const romulanShip = romulanFleet[Math.floor(Math.random() * romulanFleet.length)];
      federationShip.attack(romulanShip);

      // Remove destroyed ships from the fleet
      if (!romulanShip.isAlive()) {
        console.log(`${romulanShip.name} has been destroyed!`);
        romulanFleet.splice(romulanFleet.indexOf(romulanShip), 1);
      }
    }

    // Increment the round counter
    round++;
  }

  // Determine the winner
  if (romulanFleet.length > 0) {
    console.log('The Romulan fleet has emerged victorious!');
    return 'The Romulan fleet has emerged victorious!';
  } else {
    console.log('The Federation fleet has emerged victorious!');
    return 'The Federation fleet has emerged victorious!';
  }
}
function printName(obj) {
    if (obj !== undefined && obj !== null) {
      console.log(obj.name);
    } else {
      console.log("Object is undefined or null");
    }
  }
  

const app = express();

app.get('/', (req, res) => {
  const result = battle();
  res.send(result);
});
const port = 3000;
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
  