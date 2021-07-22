const express = require('express'); // Подключение express
const config = require('config');   // Подключение пакета config
const mongoose = require('mongoose'); // Подключение пакета mongoose для соединения с MongoDB

const storeOption = {
    "maxStore1": 7,
    "maxStore2": 12,
    "maxStore3": 22
}

function randomInt (max, min = 1) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// const bakery = randomInt(60, 15);
// const store1 = randomInt(storeOption.maxStore1);
// const store2 = randomInt(storeOption.maxStore2);
// const store3 = randomInt(storeOption.maxStore3);
//
//
// console.log("Пекарня спекла: ", bakery);
// console.log("Отправленно на магазин 1: ", store1);
// console.log("Отправленно на магазин 2: ", store2);
// console.log("Отправленно на магазин 3: ", store3);


// console.log(randomInt(1, storeOption.store1));

const app = express();

app.use(express.json({ extended: true }));

app.use('/api/stores', require('./routes/stores.router'));
app.use('/api/bakery', require('./routes/bakery.router'));
app.use('/api/home', require('./routes/home.router'));

const PORT = config.get('port') || 5000;

async function start() {
    try{
        await mongoose.connect(config.get('mongoURI'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT,() => console.log(`App started on port ${PORT}...`))
        // app.listen(PORT, () => console.log(randomInt(5, 22)));
    } catch (e) {
        console.log('Server error', e.message);
        process.exit(1);
    }
}

start();
