import React from 'react';
import { Row, Col } from 'reactstrap';

export default () => (
    <Row>
        <Col className="footer">
            Copyright &copy;
            {' '}
            {new Date().getFullYear()}
            {' '}
Digdi.ru
        </Col>
    </Row>
);
