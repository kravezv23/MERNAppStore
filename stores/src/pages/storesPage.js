import React, {useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';

export const StoresPage = () => {
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        name_store: '',
        name_store_option: '',
        max_order: ''
    })

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError])


    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    }

    const addStore = async () => {
        try {
            const data = await request('/api/stores/add', 'POST', {...form});
            message(data.message);
        } catch (e) {
        }
    }
    const addOption = async () => {
        try {
            const data = await request('/api/stores/addOption', 'POST', {...form});
            message(data.message);
            console.log('Data', data);
        } catch (e) {
            console.log('Не работает')
        }
    }



    return(
        <div className="container">
            <h1 className="center-align">Магазины</h1>
            <div className="col s12">
                <div className="row">
                    <h5 className="col s12">Добавить магазин</h5>
                    <div className="input-field col s10">
                        <input id="name_store" type="text" name="name_store" onChange={changeHandler}/>
                        <label htmlFor="name_store">Название магазина: </label>
                    </div>
                    <div className="input-field col s2">
                        <button className="btn waves-effect waves-light" type="submit" onClick={addStore} disabled={loading}>Добавить</button>
                    </div>
                </div>
            </div>
            <div className="col s12">
                <div className="row">
                    <h5 className="col s12">Изменить лимит заказа</h5>
                    <div className="input-field col s5">
                        <input id="name_store_option" type="text" className="validate" name="name_store_option" onChange={changeHandler}/>
                        <label htmlFor="name_store_option">Введите название магазина: </label>
                    </div>
                    <div className="input-field col s5">
                        <input id="max_order" type="number" className="validate" name="max_order" onChange={changeHandler}/>
                        <label htmlFor="max_order">Max количество в день: </label>
                    </div>
                    <div className="input-field col s2">
                        <button className="btn waves-effect waves-light" type="submit" onClick={addOption} disabled={loading}>Изменить</button>
                    </div>
                </div>
            </div>
            <table className="striped centered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Магазин</th>
                        <th>Продано</th>
                        <th>Остаток</th>
                        <th>Лимит заказа</th>
                        <th>Поступление</th>
                        <th>Время</th>
                        <th>Дата</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Магазин 1</td>
                        <td>10</td>
                        <td>5</td>
                        <td>15</td>
                        <td>8</td>
                        <td>11:06</td>
                        <td>21.07.2021</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}