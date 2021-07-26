import React, {useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';

export const BakeryPage = () => {
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        min_prod: '',
        max_prod: ''
    })
    const [bakery] = useState(null)
    console.log(bakery);
    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError])


    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    }

    const addOption = async () => {
        try {
            const data = await request('/api/bakery/addOption', 'POST', {...form});
            message(data.message);
            console.log('Data', data);
        } catch (e) { }
    }

    return(
        <div className="container">
            <h1 className="center-align">Пекарня</h1>
            <div className="row">
                <h5 className="col s12">Изменить объемы производства</h5>
                <div className="input-field col s5">
                    <input id="min_prod" type="number" className="validate" name="min_prod" onChange={changeHandler}/>
                    <label htmlFor="min_prod">Min производство в день: </label>
                </div>
                <div className="input-field col s5">
                    <input id="max_prod" type="number" className="validate" name="max_prod" onChange={changeHandler}/>
                    <label htmlFor="max_prod">Max производство в день: </label>
                </div>
                <div className="input-field col s2">
                    <button className="btn waves-effect waves-light" type="submit" onClick={addOption} disabled={loading}>Изменить</button>
                </div>
            </div>
            <table className="striped centered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Произведенно</th>
                        <th>На складе</th>
                        <th>Отправленно на магазины</th>
                        <th>Время</th>
                        <th>Дата</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>15</td>
                        <td>0</td>
                        <td>10</td>
                        <td>10:18</td>
                        <td>21.07.2021</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}