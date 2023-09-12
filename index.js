const express = require('express');
const server = express();
const mongoose = require('mongoose');
const cors = require('cors')

const { createProduct } = require('./controller/Product');
const productsRouter = require('./routes/Products');
const categoriesRouter = require('./routes/Categories');
const brandsRouter = require('./routes/Brands');
const usersRouter = require('./routes/Users');
const authRouter = require('./routes/Auth');
const cartRouter = require('./routes/Cart');
const ordersRouter = require('./routes/Order');
const path=require('path');

//middlewares
server.use(express.static(path.resolve(__dirname, 'build')));
server.use(cors({
    exposedHeaders:['X-Total-Count']
}))
server.use(express.json()); // to parse req.body
server.use('/products', productsRouter.router);
server.use('/categories', categoriesRouter.router)
server.use('/brands', brandsRouter.router)
server.use('/users', usersRouter.router)
server.use('/auth', authRouter.router)
server.use('/cart', cartRouter.router)
server.use('/orders', ordersRouter.router)

// this line we add to make react router work in case of other routes doesnt match
server.get('*', (req, res) =>
  res.sendFile(path.resolve('build', 'index.html'))
);

main().catch(err=> console.log(err));

async function main(){
    await mongoose.connect('mongodb+srv://vipul645645:zFpISxj7qJ8q2IAr@cluster0.9npaj5y.mongodb.net/ecommerce?retryWrites=true&w=majority');
    console.log('database connected')
}

server.listen(8080, ()=>{
    console.log('server started')
})
