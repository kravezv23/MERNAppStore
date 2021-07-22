const {Router} = require('express');
const Stores = require('../models/Stores');
const Options = require('../models/Options');
// const {check, validationResult} = require('express-validator')
const router = Router();

// router.get('/stores', {
//     title: 'Магазины'
// })



// api/stores/add
// Создание нового магазина.

router.post('/add', async (req, res) => {
    try{
        // const errors = validationResult(req);
        //
        // if(!errors.isEmpty()){
        //     return res.status(400).json({
        //         errors: errors.array(),
        //         message: 'Введенны не коректные данные!'
        //     })
        // }

        const {name_store} = req.body;

        if (name_store == '') {
            return res.status(400).json({ message: 'Для создания магазина заполните поле "Название магазина"' });
        }

        const store = await Stores.findOne({name: name_store});

        if (store) {
            return res.status(400).json({ message: 'Такой магазин уже существует!' });
        }

        const addStore = new Stores({name: name_store});

        await addStore.save();

        // res.redirect('/stores');
        return res.status(201).json({ message: 'Магазин успешно создан!' });

    } catch (e) {
        return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова!' })
    }
});

router.post('/addOption', async (req, res) => {
    try{

        const {name_store_option, max_order} = req.body;

        if (name_store_option == '' || max_order == '') {
            return res.status(400).json({ message: 'Для добавления лимит заказа заполните оба поля' });
        }

        const store = await Stores.findOne({name: name_store_option});

        if (!store) {
            return res.status(400).json({ message: 'Такого магазина не существует. Невозможно задать лимит заказа.' });
        }

        const optionStore = `option_store_order_${store._id}`;
        const option = await Options.findOne({name: optionStore});

        if(!option){
            const addOption = new Options({name: optionStore, max: max_order});
            await addOption.save();
            return res.status(201).json({ message: 'Лимит заказа успешно добавлен' });
        } else {
            await Options.updateOne(
                { name: optionStore },
                { $set: { max: max_order } }
            );
            return res.status(201).json({ message: 'Лимит заказа успешно обновлен' });
        }

    } catch (e) {
        return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова!' })
    }
})

module.exports = router;