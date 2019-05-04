/* eslint-disable no-trailing-spaces */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class About extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="h1  text-center">Гарантия</h1>
                        <hr />
                        <p className="lead">
                            Мы предоставляем money back (возврат денег) в течении 3 дней с
                            момента получения а также 30 дневную гарантию.
                            Вы также можете приобрети дополнительную расширенную гарантию — фактически страховку
                            на более длительный период (от полугода до 3-х лет)

                            <hr />
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(About);
