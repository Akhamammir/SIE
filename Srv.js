// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const B = require('body-parser');
// Get our API routes
const api = require('./Srv/Api/Routes');
const Upp = require('./Srv/Api/Upload');
const Mail = require('./Srv/Api/Mail');
var images = require('./Srv/Api/Img');
const app = express();
// Parsers for POST data
app.use(B.urlencoded({
  limit: '10mb',
  parameterLimit: 100000,
  extended: false 
}));
app.use(B.json({
  limit: '10mb'
}));
/*
app.use(bodyParser.urlencoded({ extended: false }));*/
// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
// Set our api routes
app.use('/api', api);
app.use('/Upp', Upp);
app.use('/Mail', Mail);
app.use('/img', images);
app.use(express.static(__dirname +'/Srv/Imgs'));
// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '4200';
app.set('port', port);
/**
 * Create HTTP server.
 */
const server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));