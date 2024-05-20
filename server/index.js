const express = require('express');
const cors = require('cors');
const connectDB = require('./dataBase/database');
const bodyParser = require('body-parser');

const usuarioRouter = require('./routes/users');

var app = express();
const port = 3000

//conexion a bd
connectDB();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
// Habilitar CORS para consumo de los
app.use(cors());

//ruta principal
app.get('/', (req, res) => {
    res.send('API CARD CREDITS');
  });
  

//rutas
app.use('/usuarios', usuarioRouter);


app.listen(port, () => {
    console.log(`se desplego el servidor en el puerto 3001`)
  })
  