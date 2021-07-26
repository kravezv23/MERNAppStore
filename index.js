const express = require('express'); // Подключение express
const config = require('config');   // Подключение пакета config
const mongoose = require('mongoose'); // Подключение пакета mongoose для соединения с MongoDB
const Options = require('./models/Options');
const Bekary = require('./models/Bekary');
const Stores_turnover = require('./models/Stores_turnover');

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
    } catch (e) {
        console.log('Server error', e.message);
        process.exit(1);
    }
}

start();


// async function addDataBakery(data){
//
// }

// async function addDataStoresTurnover(data){
//
// }



function randomInt (max, min = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let crone = setInterval(async () => {
    let options = [];
    let option_bakery = [];
    let option_store = [];
    let data_store = [];
    let data_bakery = {};
    let sum_order = 0;

    try {
        const req_options = await Options.find({});
        if (req_options.length != 0) {
            options = req_options
        }
    } catch (e) { }
    if (options.length != 0) {
        options.forEach((e) => {
            if (e.name == 'option_bakery_prod') {
                let storage_bekary = [];
                const storage = async () => {
                    try {
                        const option_bakery_prod = await Bekary.find({}).limit(1).sort({_id: -1});
                        if (option_bakery_prod.length != 0) {
                            storage_bekary = option_bakery_prod
                        }
                    } catch (e) { }
                }
                option_bakery = {
                    'min': e.min,
                    'max': e.max,
                    'yesterday': {
                        'producted': storage_bekary.producted || 0,
                        'sent': storage_bekary.sent || 0,
                        'storage': storage_bekary.storage || 0,
                    }
                };
            }
            if (e.name.indexOf('option_store_order') != -1) {
                const id_store = e.name.split('-')[1];
                let storage_store = [];
                const storage = async () => {
                    try {
                        const option_store_order = await Stores_turnover.find({id_store}).limit(1).sort({_id: -1});
                        if (option_store_order.length != 0) {
                            storage_store = option_store_order
                        }
                    } catch (e) { }
                }
                option_store.push({
                    '_id': id_store,
                    'max': e.max,
                    'yesterday': {
                        'received': storage_store.received || 0,
                        'sold': storage_store.sold || 0,
                        'storage': storage_store.storage || 0
                    }
                });
                sum_order += e.max;
            }
        });
    }

    if(option_bakery.length != 0 && option_store.length != 0){
        const date = new Date();
        let producted = randomInt(option_bakery.max, option_bakery.min);

        data_bakery = {
            'producted': producted || 0,
            'time': date,
        };

        if(producted >= sum_order){
            option_store.forEach((e) => {
                const sold = randomInt((e.yesterday.storage + e.yesterday.received) - 1) || 0;
                const received = e.max - e.yesterday.storage || 0;
                const storage = (e.yesterday.storage + e.yesterday.received) - e.yesterday.sold || 0;
                data_store.push({
                    'id_store': e._id,
                    'received': received || 0,
                    'sold': sold || 0,
                    'storage': storage || 0,
                    'time': date,
                });
                producted = producted - received;
            })
            data_bakery = {
                'producted': data_bakery.producted,
                'sent': data_bakery.producted - producted || 0,
                'storage': producted + option_bakery.yesterday.storage || 0,
                'time': date,
            };
        } else {
            let max_received = [];
            option_store.forEach((e) => {
                max_received[e._id] =  e.max - e.yesterday.storage || 0;
                const sold = randomInt((e.yesterday.storage + e.yesterday.received) - 1) || 0;
                const storage = (e.yesterday.storage + e.yesterday.received) - e.yesterday.sold || 0;
                data_store.push({
                    'id_store': e._id,
                    'received': 0,
                    'sold': sold || 0,
                    'storage': storage || 0,
                    'time': date,
                });
            });
            for (let i = 0; producted > 0; i++){
                data_store.forEach((e) => {
                    if(producted != 0 && max_received[e.id_store] > e.received){
                        e.received ++;
                        producted --;
                    }
                });
            }
            data_bakery = {
                'producted': data_bakery.producted,
                'sent': data_bakery.producted - producted || 0,
                'storage': producted + option_bakery.yesterday.storage || 0,
                'time': date,
            };
        }
    }

    if(data_bakery.length != 0){
        try{
            const add_data_bakery = new Bekary(data_bakery);
            await add_data_bakery.save();
        } catch (e) {}
    }

    if(data_store.length != 0) {
        try {
            await Stores_turnover.insertMany(data_store).save();
        } catch (e) { }
    }
}, 1000*3000);