import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import getSlug from 'speakingurl';
import isEmpty from '../../validation/is-empty';

function ItemsDisplayedOnPage(props) {
    let filteredItemsRendered = props.catalog.filter((item) => item.category === props.categoryName);
    if (props.categoryName === 'all') {
        filteredItemsRendered = props.catalog;
    }
    let rusCategoryName;
    let catalogItemsData = [];

    if (props.categoryName === 'all') {
        rusCategoryName = 'Все товары';
    } else {
        rusCategoryName = props.engToRusCatTitlesMap[props.categoryName];
    }

    if (props.validCategoryProvided) {
        console.log('===+++===+++[CatalogPage] validCategory found: ', props.categoryName);

        if (!props.validItemProvided) {
            catalogItemsData = <h2>Товар не найден</h2>;
            console.log('===+++>[CatalogPage] Пустая категория');
        } else {
            catalogItemsData = filteredItemsRendered.map(item => (
                <li className="product" key={item._id}>
                    <div className="product-inner">
                        <span className="loop-product-categories">
                            <Link to={item.category}>
                                {props.engToRusCatTitlesMap[item.category]}
                            </Link>
                        </span>
                        <Link
                            onClick={() => props.onItemClick(item.categoryId)}
                            to={
                                { pathname: `/tovary/${getSlug(item.category, { lang: 'ru' })}/${getSlug(item.title, { lang: 'ru' })}` }
                            }
                        >
                            <h3>{item.title}</h3>
                            <div className="product-thumbnail">
                                <img
                                    src={isEmpty(item.image)
                                        ? ('ad-banner-3.png')
                                        : (item.image)
                                    }
                                    alt=""
                                />
                            </div>
                        </Link>
                        <div className="price-add-to-cart">
                            <span className="amount">Цена: &#8381;&nbsp;{item.price}</span>
                        </div>
                    </div>

                </li>
            ));
        }
    } else {
        catalogItemsData = <h1>Категория товара не найдена</h1>;
    }


    return (
        <div className="col-lg-9 col-md-12">
            <header className="product-category-header">
                <h2 className="h1">{rusCategoryName}</h2>
            </header>
            <ul className="products">
                {catalogItemsData}
            </ul>
        </div>
    );
}

ItemsDisplayedOnPage.propTypes = {
    catalog: PropTypes.array.isRequired,
    categoryName: PropTypes.string.isRequired,
    validItemProvided: PropTypes.bool.isRequired,
    validCategoryProvided: PropTypes.bool.isRequired,
    onItemClick: PropTypes.func.isRequired,
    engToRusCatTitlesMap: PropTypes.objectOf(PropTypes.string).isRequired
};

export default ItemsDisplayedOnPage;
