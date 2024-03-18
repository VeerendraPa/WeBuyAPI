const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to set CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Proxy route
app.post('/proxy', async (req, res) => {
    try {
        const { default: fetch } = await import('node-fetch'); // Use dynamic import
        const response = await fetch('https://2etiystoqy2wpnj4b6lptfwpbi0sfnsy.lambda-url.us-west-2.on.aws/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'https://stage.webuyexotics.dev'
            },
            body: JSON.stringify({
                user_input: "Hello", 
                thread_id: ''
            }),
        });
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});