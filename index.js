var express = require('express');
var app = express();

var htmlTemplate = `
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta charset="utf-8">
        <title></title>
        <link rel="shortcut icon" href="">
        <script>
          console.log(new Date() + ' header script executed');
        </script>
        <script src="/main.js"></script>
    </head>
    <body>
        <script>console.log(new Date() + ' body is rendered');</script>
    </body>
</html>
`;

var mainJS = `console.log(new Date() + ' main.js is loaded');`;

app.get('/', function (req, res) {
    // Allow partial content to be flushed
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');

    // Inform the browser that partial content will be flushed
    // But this allows also us to send before know what we will send, perfect for isomorphic pages
    res.setHeader('Transfer-Encoding', 'chunked');

    let htmlSlices = htmlTemplate.split('<body');

    res.write(htmlSlices[0]);

    setTimeout(() => {
        res.end('<body' + htmlSlices[1]);
    }, 10e3);
});

app.get('/main.js', function (req, res) {
    res.setHeader('Content-Type', 'application/javascript');

    res.end(mainJS);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
