const {Router} = require('express');
const Options = require('../models/Options');
const Bekary = require('../models/Bekary');
const router = Router();

// api/bakery/addOption
// Создание опции для пекарни

router.post('/addOption', async (req, res) => {
    try{

        const {min_prod, max_prod} = req.body;

        if (min_prod == '' || max_prod == '') {
            return res.status(400).json({ message: 'Для добавления объемов производства необходимо заполнить оба поля' });
        }
        if (min_prod > max_prod) {
            return res.status(400).json({ message: 'Минимальный объем производства не может быть больше максимального' });
        }

        const optionBakery = `option_bakery_prod`;
        const option = await Options.findOne({name: optionBakery});

        if(!option){
            const addOption = new Options({name: optionBakery, max: max_prod, min: min_prod});
            await addOption.save();
            return res.status(201).json({ message: 'Объем производства успешно добавлен' });
        } else {
            await Options.updateOne(
                { name: optionBakery },
                { $set: { max: max_prod, min: min_prod } }
            );
            return res.status(201).json({ message: 'Объем производства успешно обновлен' });
        }

    } catch (e) {
        return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова!' })
    }
})


router.get('/', async (req, res) => {
    try{
        const bekary = await Bekary.find({});
    } catch (e) {
        return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова!' })
    }
    res.render('bekaryPage', {
        title: "Пекарня",
        bekary
    })
})



module.exports = router;