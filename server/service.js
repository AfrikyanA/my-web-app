const { MongoClient } = require('mongodb');

const handleError = (res, message, code = 500) => {
    console.error(message);
    res.status(code).json({ message: message });
};

const client = new MongoClient('mongodb://127.0.0.1:27017');
let products = null;

const connectDB = async (req, res) => {
    try {
        await client.connect();
        console.log('Connect to db');
        products = client.db('ashotdb').collection('products');
        
    } catch (err) {
        console.error('Cant connect to db', err);
    }
};

const getProducts = async (req, res) => {
    try{
        const productList =  await products.find({}).toArray();
        res.status(200).json( productList );
    }
    catch (err) {
        handleError(res, 'Failed to fetch products');
    }
};

const addProduct = async (req, res) => {
    const { name, price } = req.body;
    try {
        const newProduct = await products.insertOne({ name, price});
        res.status(201).json({ message: 'Product created successfully', user: newProduct });
    }
    catch (err) {
        handleError(res, 'Failed to save product');
    }
};

module.exports = { connectDB, getProducts, addProduct };