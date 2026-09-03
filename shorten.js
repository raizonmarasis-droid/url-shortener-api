const url = process.argv[2];

if (!url) {
    console.log('Usage: node shorten.js <url>');
    process.exit(1);
}

fetch('http://localhost:3000/api/shorten', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ originalUrl: url })
})
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            console.log(`Error: ${data.error}`);
            return;
        }
        console.log(`\nShort URL:  ${data.shortUrl}`);
        console.log(`Code:       ${data.shortCode}\n`);
    })
    .catch(() => console.log('Could not reach server. Is it running?'));