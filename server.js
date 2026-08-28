const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());


const urlDatabase = {};

app.post('/api/shorten', (req,res) => {
    const { originalUrl } = req.body;

    if (!originalUrl) {
        return res.status(400).json({ error: "Please provide valid URL"});
    }

    const shortCode = crypto.randomBytes(3).toString('hex');

    urlDatabase[shortCode] = {
        originalUrl,
        clicks: 0,
        createdAt: new Date
    };

    res.status(201).json({
        message: 'URL shortened successfully',
        shortUrl: `http://localhost:3000/${shortCode}`,
        shortCode
    });
});

app.get('/:code', (req, res) => {
    const { code } = req.params;
    const urlEntry = urlDatabase[code];
    
    if (!urlEntry) {
        return res.status(404).json({ error: 'URL not found' });
    }
    
    urlEntry.clicks++;
    
    res.redirect(302, urlEntry.originalUrl);
});

app.get('/api/analytics/:code', (req, res) => {
    const { code } = req.params;
    const urlEntry = urlDatabase[code];
    
    if (!urlEntry) {
        return res.status(404).json({ error: 'URL not found' });
    }
    
    res.json({
        originalUrl: urlEntry.originalUrl,
        totalClicks: urlEntry.clicks,
        createdAt: urlEntry.createdAt
    });
});
    
app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));




