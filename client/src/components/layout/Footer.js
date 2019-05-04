import React from 'react';

export default () => (
    <div className="container-fluid">
        <div className="row footer-copyright">
            <div className="col">
                Copyright &copy;
                {' '}
                {new Date().getFullYear()}
                {' '}
                Digdi.ru
            </div>
        </div>
    </div>
);
