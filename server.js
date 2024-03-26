const express = require('express')
const { default: mongoose } = require('mongoose')
const Product = require('./models/productModel');
const app = express()
const PORT = 3010;
app.use(express.json());

// routes
app.get('/products', async (req, res) => {
    try{
      const products = await Product.find({});
      res.status(200).json(products);
    }catch (error){
      res.status(500).json({message: error.message});
    }
});

app.get('/product/:id', async (req, res) => {
  try{
    const { id } = req.params;  
    const product = await Product.findById(id);
    res.status(200).json(product);
  }catch (error){
    res.status(500).json({message: error.message});
  }
});

app.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message)
  }
});

app.put('/product/:id', async (req, res) => {
  try {
    const { id } = req.params;  
    let product = await Product.findByIdAndUpdate(id, req.body);
    if(!product) {
      return res.status(404).json({message: `cannot find product by ID ${id}`})
    }
    product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message)
  }
});

app.delete('/product/:id', async (req, res) => {
  try {
    const { id } = req.params;  
    let product = await Product.findByIdAndDelete(id, req.body);
    if(!product) {
      return res.status(404).json({message: `cannot find product by ID ${id}`})
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message)
  }
});

mongoose.connect('mongodb+srv://.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => { 
  console.log('connected to mongodb')
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
).catch(() => {
  console.log(error)
});