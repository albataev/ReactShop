/* eslint-disable no-trailing-spaces */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class About extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="h1  text-center">Доставка и оплата</h1>
                        <hr />
                        <h4>Оплатить покупку возможно:</h4>
                        <p className="lead">
                            <ul>
                                <li>наличными в пункте выдачи Boxberry,</li>
                                <li>банковской картой (скидка 5%),</li>
                                <li>в платежных системах яндекс деньги, webmoney, киви и т. д.</li>
                            </ul>
                            Доставка по Москве и Подмосковью осуществляется курьерами, по России — транспортными компаниями или почтой России. Товар тщательно упаковывается в воздушную пленку, все риски связанные с перевозкой мы берем на себя.
                            <hr />
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(About);
