const express = require('express');
const https = require('https');
const app = express();
const port = 3000;
// Middleware to set CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use('/', async (req, res) => {
    try {
        const options = {
            hostname: 'wss2.cex.uk.webuy.io',
            path: '/v3/supercats',
            method: 'GET'
        };
        const request = https.request(options, response => {
            let data = '';
            response.on('data', chunk => {
                data += chunk;
            });
            response.on('end', () => {
                res.json(JSON.parse(data));
            });
        });
        request.on('error', error => {
            console.error('Proxy request failed:', error);
            res.status(500).json({ error: 'Proxy request failed' });
        });
        request.end();
    } catch (error) {
        console.error('Proxy request failed:', error);
        res.status(500).json({ error: 'Proxy request failed' });
    }
});
app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
});