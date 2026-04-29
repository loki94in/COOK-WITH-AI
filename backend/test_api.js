const http = require('http');
const fs = require('fs');

const testData = JSON.parse(fs.readFileSync('test_data.json', 'utf8'));
const data = JSON.stringify({
  url: testData.url
});


const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/v1/extract',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('STATUS:', res.statusCode);
    try {
        const parsed = JSON.parse(body);
        console.log('RESULT:', JSON.stringify(parsed, null, 2));
    } catch (e) {
        console.log('RAW BODY:', body);
    }
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
