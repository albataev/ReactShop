import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import isEmpty from '../../validation/is-empty';


// main page display catalog
class ProfileCreds extends Component {
  render() {
    const options = {
      computery: 'Компьютеры',
      avtoelectronika: 'Автоэлектроника',
      igroviecomputery: 'Игровые компьютеры и приставки',
      complectujushie: 'Комплектующие',
      monitoryitelevizory: 'Мониторы и телевизоры',
      noutbuki: 'Ноутбуки'
    };
    const { catalog } = this.props;
    // implement in getting category by filtering...
    const filterValue = '';
    let catalogItems = [...catalog];
    if (filterValue !== '') {
      catalogItems = catalog.filter(item => {
        if (item.title === filterValue) {
          return item;
        }
      });
    }
    catalogItems = catalogItems.map(item => (
      <div key={item._id} className="col-md-6">
        {/*<ul className="list-group">*/}
          {/*<li className="list-group-item">*/}
            <div className="row">
              <div className="col-md-4">
                <img src="http://digdi.ru/wp-content/uploads/2018/07/%D0%BC%D0%BE%D0%BD%D0%B8%D1%82%D0%BE%D1%80-24-300x300.jpg" alt="" className="img-thumbnail" />
              </div>
              <div className="col-md-8">
                <h4>
                  { item.title }
                </h4>
                <p>
                  <strong>Категория: </strong>
                  {options[item.category]}
                </p>
                <p>
                  <span>
                    <strong>Цена: </strong>
                    {item.price}
                  </span>
                </p>
                {isEmpty(item.description)
                  ? (
                    <p>
                      <span>
                        <strong>Описание: </strong>
                        не указано
                      </span>
                    </p>
                  )
                  : (
                    <p>
                      <span>
                        <strong>Описание: </strong>
                        {item.description}
                      </span>
                    </p>
                  )
                }
              </div>
            </div>
          {/*</li>*/}
        {/*</ul>*/}
      </div>
    ));

    return (
      <div className="row">
        {catalogItems}
      </div>
    );
  }
}

ProfileCreds.propTypes = {
  catalog: PropTypes.array.isRequired
};

export default ProfileCreds;
