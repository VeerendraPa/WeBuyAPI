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
    //try {
    //    const options = {
    //        hostname: 'wss2.cex.uk.webuy.io',
    //        path: '/v3/supercats',
    //        method: 'GET'
    //    };
    //    const request = https.request(options, response => {
    //        let data = '';
    //        response.on('data', chunk => {
    //            data += chunk;
    //        });
    //        response.on('end', () => {
    //            res.json(JSON.parse(data));
    //        });
    //    });
    //    request.on('error', error => {
    //        console.error('Proxy request failed:', error);
    //        res.status(500).json({ error: 'Proxy request failed' });
    //    });
    //    request.end();
    //} catch (error) {
    //    console.error('Proxy request failed:', error);
    //    res.status(500).json({ error: 'Proxy request failed' });
    //}

    try {
        let endpointPath;

        // Determine the endpoint based on the request path
        switch (req.path) {
            case '/supercats':
                endpointPath = '/v3/supercats';
                break;
            case '/productlines':
                endpointPath = '/v3/productlines?superCatIds=[1,2,3,4,5,8]';
                break;
            case '/categories':
                endpointPath = '/v3/categories?productLineIds=[70,81,92,91,8,49,59,6,33,29,67,74,39,79,7,10,26,54,17,40,78,13,14,32,25,28,15,61,62,76,27,21,16,51,80,65,18,23,84,83,19,85,71,68,60,73,64,63,75]';
                break;
            // Add more cases for other endpoints as needed
            default:
                res.status(404).json({ error: 'Endpoint not found' });
                return;
        }

        const options = {
            hostname: 'wss2.cex.uk.webuy.io',
            path: endpointPath,
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