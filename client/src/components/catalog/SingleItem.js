import React from 'react';
import PropTypes from 'prop-types';

function SingleItem(props) {
    const generateKey = (pre) => (`${pre}_${new Date().getTime()}`);
    const specification = props.selectedItem.longtitle.split('\n')
        .map((descItem, index) => (<li key={generateKey(index)}>{descItem}</li>));
    return (
        <div className="col-lg-9 col-md-12 product">
            <header>
                <h2 className="h1">{props.rusCategory}</h2>
            </header>
            <div className="row">
                <div className="col-lg-6 col-md-12">
                    <div className="thumbnails-single">
                        <a href={props.selectedItem.image} target="_blank" rel="noopener noreferrer">
                            <img src={props.selectedItem.image} alt={`Товар: ${props.selectedItem.title}`} />
                        </a>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12">
                    <h3 itemProp="name">
                        {props.selectedItem.title}
                    </h3>
                    <hr className="single-product-title-divider" />
                    <div className="product-parameters" itemProp="description">
                        <h4>Технические характеристики:</h4>
                        <ul>
                            {specification}
                        </ul>
                    </div>
                    <hr className="single-product-title-divider" />
                    <div itemProp="price" itemScope itemType="http://schema.org/Price">
                        <p className="single-product-price">
                          Цена:&nbsp;&#8381;&nbsp;
                            {props.selectedItem.price}
                        </p>
                    </div>
                </div>
            </div>
            <div className="single-product-description">
                <h4>Описание:</h4>
                <div className="single-product-description-content">
                    {props.selectedItem.description}
                </div>
            </div>
        </div>
    );
}

SingleItem.propTypes = {
    rusCategory: PropTypes.string.isRequired,
    selectedItem: PropTypes.object.isRequired
};

export default SingleItem;
