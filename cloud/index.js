const Influx = require('influx');
const express = require('express');

const influx = new Influx.InfluxDB(process.env['INFLUXDB_URL']);

const app = express();

app.get('/', (req, res) => res.send('Nothing to see here\r\n'));

app.post('/hook', (req, res) => {

	res.json({ ok: true });
});


const httpPort = process.env['PORT'] || 5000;
const httpServer = app.listen(httpPort, () => {
	console.log(`Listening for HTTP on port ${httpPort}`);
});

