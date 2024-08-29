const express = require('express');
const bodyParser =  require('body-parser');
const { connectDB, getProducts, addProduct } = require('./service.js');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

connectDB();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
  });
app.get('/products', getProducts);
app.post('/products', addProduct);

app.listen(3008, (err) => {
    if (err) {
        return console.log('Cant connect to port' + PORT,err);
    }
    console.log('Connect');
}); 