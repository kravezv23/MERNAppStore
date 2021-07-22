import React, {useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';

export const HomePage = () => {
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        delivery_time: ''
    })

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError])


    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    }

    const addOption = async () => {
        try {
            const data = await request('/api/home/addOption', 'POST', {...form});
            message(data.message);
            console.log('Data', data);
        } catch (e) {  }
    }

    return(
        <div className="container">
            <h1 className="center-align">Отчет поставок</h1>
            <div className="col s12">
                <div className="row">
                    <h5 className="col s12">Изменить время поставок</h5>
                    <div className="input-field col s10">
                        <input id="delivery_time" type="number" name="delivery_time" onChange={changeHandler}/>
                        <label htmlFor="delivery_time">Переодичность поставок в минутах: </label>
                    </div>
                    <div className="input-field col s2">
                        <button className="btn waves-effect waves-light" type="submit" onClick={addOption} disabled={loading}>Добавить</button>
                    </div>
                </div>
            </div>
            <table id="home_report" className="striped centered">
                <thead>
                    <tr>
                        <th colSpan="1" rowSpan="2">ID</th>
                        <th colSpan="4">Магазин</th>
                        <th colSpan="2">Пекарня</th>
                        <th colSpan="1" rowSpan="2">Время</th>
                        <th colSpan="1" rowSpan="2">Дата</th>
                    </tr>
                    <tr>
                        <th>Название магазина</th>
                        <th>Продано</th>
                        <th>Остаток</th>
                        <th>Лимит заказа</th>
                        <th>Произведено</th>
                        <th>Отправлено</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Магазин 1</td>
                        <td>8</td>
                        <td>10</td>
                        <td>18</td>
                        <td>50</td>
                        <td>10</td>
                        <td>10:15</td>
                        <td>27.05.2021</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}