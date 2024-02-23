const { exec } = require('child_process');
const { faker } = require('@faker-js/faker');

// Constants
const numExecutions = 3;
const inputDataSize = 10;

// Function to generate a random ISBN number
function generateRandomISBN() {
    // Generate a random 10-digit number
    return Math.floor(Math.random() * 9000000000) + 1000000000;
}

// Function to generate random book data
function generateRandomBook() {
    return [
        faker.person.fullName(), // Author name
        faker.lorem.words(3), // Book title
        faker.lorem.sentence(), // Random sentence 1
        faker.lorem.sentence(), // Random sentence 2
        faker.lorem.sentence(), // Random sentence 3
    ];
}

// Function to generate random inputData object
function generateRandomInputData() {
    const inputData = {};
    for (let i = 0; i < inputDataSize; i++) {
        inputData[generateRandomISBN()] = generateRandomBook();
    }
    return inputData;
}

// Function to execute dataReceiver.js multiple times
function executeDataReceiver() {
    // Generate random input data
    const input = JSON.stringify(generateRandomInputData());

    console.log(`\n--> Input: ${input}`);

    // Execute dataReceiver.js with simulated input data
    exec(`echo '${input}' | node dataReceiver.js`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`\n<-- Output: ${stdout}`);
    });
}

// Execute dataReceiver.js multiple times
for (let i = 0; i < numExecutions; i++) {
    executeDataReceiver();
}
