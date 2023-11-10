const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send({ status: 'Bien' });
});

app.get('/test', (req, res) => {
    res.send({ status: 'Bien' });
});

const PORT = 7206;
app.listen(PORT, () => {
    console.log(`El servidor está ejecutándose en el puerto ${PORT}`);
});
