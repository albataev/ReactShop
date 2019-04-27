import React from 'react';
import PropTypes from 'prop-types';

function SingleItem(props) {
  const generateKey = (pre) => (`${pre}_${new Date().getTime()}`);
  const specification = props.selectedItem.longtitle.split('\n')
    .map((descItem, index) => (<li key={generateKey(index)}>{descItem}</li>));
  return (
    <div className="product">
      <header>
        <a name="top-page">
          <h2 className="h1">{props.rusCategory}</h2>
        </a>
      </header>
      <div className="single-product-wrapper">
        <div className="product-images-wrapper">
          <div className="images electro-gallery">
            <div className="thumbnails-single">
              <a href={props.selectedItem.image} target="_blank" rel="noopener noreferrer">
                <img src={props.selectedItem.image} className="wp-post-image" alt="" />
              </a>
            </div>
          </div>
        </div>
        <div className="summary entry-summary">
          <h1 itemProp="name" className="product_title entry-title">
            {props.selectedItem.title}
          </h1>
          <div className="availability in-stock">
            В наличии:&nbsp;
            <span>да</span>
          </div>
          <hr className="single-product-title-divider" />
          <div itemProp="description">
            <ul>
              {specification}
            </ul>
          </div>
          <hr className="single-product-title-divider" />
          <div itemProp="offers" itemScope itemType="http://schema.org/Offer">
            <p className="price-add-to-cart">
              <span className="electro-price single-item-price">
                <span className="amount">Цена:&nbsp;&#8381;&nbsp;{props.selectedItem.price}</span>
              </span>
            </p>
            <meta itemProp="price" content="1215" />
            <meta itemProp="priceCurrency" content="USD" />
            <link itemProp="availability" href="http://schema.org/InStock" />
          </div>
        </div>
      </div>
      <div className="woocommerce-tabs wc-tabs-wrapper">
        <ul className="nav nav-tabs electro-nav-tabs tabs wc-tabs" role="tablist">
          <li className="nav-item description_tab">
            <a href="#tab-description" className="active" data-toggle="tab">Описание</a>
          </li>
        </ul>
        <div className="tab-content">
          <div className="tab-pane active in panel entry-content wc-tab" id="tab-description">
            <div className="electro-description">
              {props.selectedItem.description}
            </div>
          </div>
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
