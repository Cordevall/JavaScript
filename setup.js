const readline = require('readline');
const fs = require('fs');

function setupBot() {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const setup = {};

    rl.question('Enter your Discord token: ', (token) => {
      setup.token = token;

      rl.question('Enter your MongoDB connection URL: ', (mongoUrl) => {
        setup.mongoUrl = mongoUrl;

        rl.question('Enter the color for general embeds: ', (generalColor) => {
          setup.generalColor = generalColor;

          rl.question('Enter the color for accept embeds: ', (acceptColor) => {
            setup.acceptColor = acceptColor;

            rl.question('Enter the color for decline embeds: ', (declineColor) => {
              setup.declineColor = declineColor;

              rl.question('Enter your developer ID: ', (devId) => { // New question
                setup.devId = devId; // Save the answer to the setup object

                console.log('Setup completed!');
                console.log('Setup:', setup);

                const setupData = JSON.stringify(setup, null, 2);
                fs.writeFileSync('setup.json', setupData);
                console.log('Setup data saved to setup.json');

                rl.close();
                resolve(setup);
              });
            });
          });
        });
      });
    });
  });
}

module.exports = setupBot;