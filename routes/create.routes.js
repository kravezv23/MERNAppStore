// const {Router} = require('express');
// const Stores = require('../models/Stores');
// const router = Router();
//
// // api/create
// /*
//     Создание нового магазина.
// */
// router.post('/create', async (req, res) => {
//     try{
//         const {name} = req.body;
//
//         const store = await Stores.findOne({name: name});
//
//         if (store) {
//             return res.status(400).json({ message: 'Такой магазин уже существует!' });
//         }
//
//         const addStore = new Stores({name: name});
//
//         await addStore.save();
//
//         res.status(201).json({ message: 'Магазин успешно создан.' });
//
//     } catch (e) {
//         res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова!' })
//     }
// })
//
// module.exports = router;