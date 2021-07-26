const {Router} = require('express');
const Options = require('../models/Options');
const router = Router();

// api/home/addOption
// Создание опции время обновления поставок

router.post('/addOption', async (req, res) => {
    try{

        const {delivery_time} = req.body;

        if (delivery_time == '') {
            return res.status(400).json({ message: 'Для обновления времени поставок заполните поле' });
        }

        const optionTime = `option_delivery_time`;
        const option = await Options.findOne({name: optionTime});

        if(!option){
            const addOption = new Options({name: optionTime, max: delivery_time});
            await addOption.save();
            return res.status(201).json({ message: 'Время поставок успешно добавлено' });
        } else {
            await Options.updateOne(
                { name: optionTime },
                { $set: { max: delivery_time } }
            );
            return res.status(201).json({ message: 'Время поставок успешно обновлено' });
        }

    } catch (e) {
        return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова!' })
    }
})

module.exports = router;