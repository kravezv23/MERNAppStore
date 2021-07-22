import React from 'react';

export const HomePage = () => {
    return(
        <div className="container">
            <h1 className="center-align">Отчет поставок</h1>
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