const { MongoClient } = require('mongodb');

const handleError = (res, message, err, code = 500) => {
    console.error(message + err);
    res.status(code).json({ message: message});
};

const client = new MongoClient('mongodb://127.0.0.1:27017');
let products = null;

const connectDB = async (req, res) => {
    try {
        await client.connect();
        console.log('Connect to db');
        products = client.db('ashotdb').collection('products');
        
    } catch (err) {
        handleError(res, 'Cant connect to db', err);
    }
};

const getProducts = async (req, res) => {
    try{
        const result =  await products.find({}).toArray();
        res.status(200).json( result );
    }
    catch (err) {
        handleError(res, 'Failed to fetch products', err);
    }
};

const addProduct = async (req, res) => {
    const { name, price } = req.body;
    try {
        const result = await products.insertOne({ name, price});
        res.status(201).json({ message: 'Product created successfully', user: result });
    }
    catch (err) {
        handleError(res, 'Failed to save product', err);
    }
};

const deleteOne = async (req, res) => { 
    try {
        const result = await products.deleteOne( 
            { name: req.body.name }
        );
        res.status(201).json({ message: 'Product deleted successfully', user: result });
    }
    catch (err) {
        handleError(res, 'Failed to delete product', err);
    }
};

const updateOne = async (req, res) => {
    const { id, name, price } = req.body;
    try {
        const result = await products.updateOne(
            { name: id },
            { $set: { name, price } }
        );

        res.status(201).json({ message: 'Product updated successfully', user: result });
    }
    catch (err) {
        handleError(res, 'Failed to update product', err);
    }
};

module.exports = {
    connectDB, getProducts, addProduct, deleteOne, updateOne
};