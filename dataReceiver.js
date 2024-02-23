const fs = require('fs');
const path = require('path');

// Define a temporary directory to store external files
const tempDir = path.join(__dirname, 'temp');

// Ensure the temporary directory exists
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

// Initialize an array to store the paths of external files
const externalFiles = [];

// Process input line by line
process.stdin.on("data", function(chunk) {
    // Parse input JSON
    const jsonData = JSON.parse(chunk);

    // Iterate over each entry in the JSON object
    Object.entries(jsonData).forEach(([isbn, bookData]) => {
        // Extract author and title from bookData
        const [author, title, ...sentences] = bookData;

        // Write data to a temporary file
        const tempFile = path.join(tempDir, `${author}_${title}.json`);
        fs.writeFileSync(tempFile, JSON.stringify({ isbn, author, title, sentences }));

        // Store path of the external file
        externalFiles.push(tempFile);
    });
});

// When all data is processed
process.stdin.on("end", function() {
    // Initialize an object to store merged results
    let mergedResults = [];

    // Simple sort mutating the array
    externalFiles.sort();

    // Merge sorted data from external files
    externalFiles.forEach(filePath => {
        // Read data from external file
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // Extracting information from data, using object destructuring with aliasing
        const { author: name, isbn, title, sentences: text } = data;

        // Merging with a spread technique
        mergedResults = [...mergedResults, {name, books: [{ isbn, title, text }]}];

        // Delete the temporary file
        fs.unlinkSync(filePath);
    });

    // Output final JSON
    console.log(JSON.stringify(mergedResults));
});
