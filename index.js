// index.js
require('dotenv').config();
const fs = require('fs');
const http = require('http');

// Retrieve the link from your environment variables
const embeddedLink = process.env.EMBEDDED_LINK;

// Read the HTML file
const htmlFilePath = 'index.html';
const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

// Create a simple HTTP server
const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let data = '';

        // Collect data from the request
        req.on('data', chunk => {
            data += chunk;
        });

        // When data collection is complete
        req.on('end', () => {
            // Save the data to a file
            fs.appendFile('data.txt', data + '\n', err => {
                if (err) {
                    console.error('Error saving data:', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error saving data');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end('Data saved successfully');
                }
            });
        });
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlContent);
    }
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
