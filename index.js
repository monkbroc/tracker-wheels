const Influx = require('influx');
const express = require('express');
const bodyParser = require('body-parser')

const influx = new Influx.InfluxDB(process.env['INFLUXDB_URL'] || 'http://localhost:8086/sensors');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Nothing to see here\r\n'));

app.post('/hook', async (req, res) => {
	try {
		console.log('Received hook', req.body.data);

		const data = JSON.parse(req.body.data);

		await influx.writePoints([{
			measurement: 'vehicle',
			fields: data
		}]);

		res.json({ ok: true });
	} catch (error) {
		console.error('Error processing hook', error);
		res.status(500).json({ ok: false });
	}
});


const httpPort = process.env['PORT'] || 5000;
const httpServer = app.listen(httpPort, () => {
	console.log(`Listening for HTTP on port ${httpPort}`);
});

