const http = require('http');
const querystring = require('querystring');

http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      const formData = querystring.parse(body);
      console.log(formData); // the form data
      localStorage.setItem('formData', JSON.stringify(formData));
      res.end('success');
    });
  } else {
    res.end('send a POST request');
  }
}).listen(3000);