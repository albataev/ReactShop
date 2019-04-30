/* eslint-disable react/forbid-prop-types,jsx-a11y/anchor-is-valid,react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withRouter, Link, BrowserRouter as Router} from 'react-router-dom';
import getSlug from 'speakingurl';
import Collapsible from 'react-collapsible';
import { ListGroup, ListGroupItem } from 'reactstrap';
import isEmpty from '../../validation/is-empty';
import SingleItem from './SingleItem';
import { setCurrentItem } from '../../actions/shopActions';


// main page display catalog
class CatalogItems extends Component {
    state = {
        categoryIsCollapsed: 'test'
    };

    render() {
        console.log('===+++===+++[CatalogItems] rendering categoryName: ', this.props.categoryName);
        console.log('===+++===+++[CatalogItems] this.props.selectedItem: ', this.props.selectedItem);
        console.log('===+++===+++[CatalogItems ] this.props.shop.catalog: ', this.props.shop.catalog);
        // filter items by category name
        let filteredItemsRendered = this.props.shop.catalog.filter((item) => item.category === this.props.categoryName);
        if (this.props.categoryName === 'all') {
            filteredItemsRendered = this.props.shop.catalog;
        }
        const { categories } = this.props.shop;
        let rusCategoryName;
        let catalogItemsData = [];
        const categoriesLinksNew = [];
        const { engToRusCatTitlesMap } = this.props;

        for (let i = 0; i < categories.length; i++) {
            const collapsedChildItems = [];
            if (categories[i].hasChildren) {
                const parentCatId = categories[i]._id;
                for (let childCatIndex = 0; childCatIndex < categories.length; childCatIndex++) {
                    if (categories[childCatIndex].parent !== undefined && categories[childCatIndex].parent === parentCatId) {
                        collapsedChildItems.push(
                            <ListGroupItem
                                key={categories[childCatIndex]._id}
                                aria-labelledby="dropdownMenuLink"
                            >
                                <Link
                                    onClick={window.scrollTo(0, 0)}
                                    to={{ pathname: `/tovary/${categories[childCatIndex].title}` }}
                                >
                                    {categories[childCatIndex].russtitle}
                                </Link>
                            </ListGroupItem>
                        );
                    }
                    console.log('collapsedChildItems', collapsedChildItems);
                }

                categoriesLinksNew.push(

                    <ListGroupItem
                        className="cat-item collapsible-item"
                        key={categories[i]._id}
                        aria-expanded="false"
                    >
                        <Collapsible className="cat-item" contentContainerTagName="div" trigger={`${categories[i].russtitle} >>`}>
                            <ul>
                                {collapsedChildItems}
                            </ul>
                        </Collapsible>
                    </ListGroupItem>

                );
            } else if (!categories[i].hasChildren
                    && (categories[i].parent === undefined
                    || categories[i].parent.length === 0)) {
                categoriesLinksNew.push(
                    <ListGroupItem className="cat-item" key={categories[i]._id}>
                        <Link
                            onClick={window.scrollTo(0, 0)}
                            to={{ pathname: `/tovary/${categories[i].title}` }}
                        >
                            {categories[i].russtitle}
                        </Link>
                    </ListGroupItem>
                );
            }
        }

        if (this.props.categoryName === 'all') {
            rusCategoryName = 'Все товары';
        } else {
            rusCategoryName = engToRusCatTitlesMap[this.props.categoryName];
        }

        if (this.props.validCategoryProvided) {
            console.log('===+++===+++[CatalogItems] validCategory found: ', this.props.categoryName);
            if (!this.props.validItemProvided) {
                catalogItemsData = <h2>Товар не найден</h2>;
                console.log('===+++>[CatalogItems] Пустая категория');
            } else {
                catalogItemsData = filteredItemsRendered.map(item => (
                    <li className="product" key={item._id}>
                        <div className="product-inner">
                            <span className="loop-product-categories">
                                <a rel="tag">{engToRusCatTitlesMap[item.category]}</a>
                            </span>
                            <Link
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
                                <span className="amount">&#8381;&nbsp;{item.price}</span>
                            </div>
                            <div>
                                {isEmpty(item.description)
                                    ? (
                                        <span>
                                            <strong>Описание: </strong>не указано
                                        </span>
                                    )
                                    : (
                                        <span>
                                            <strong>Описание: </strong>
                                            {(item.description.length > 50)
                                                ? `${item.description.slice(0, 50)}...`
                                                : item.description
                                            }
                                        </span>
                                    )
                                }
                            </div>
                        </div>

                    </li>
                ));
            }
        } else {
            catalogItemsData = <h1>Категория товара не найдена</h1>;
        }
        return (
            <div>
                <div id="primary">
                    <main id="main" className="site-main">
                        <section>
                            <div className="row">
                                <aside className="col-3 d-none d-lg-block categories">
                                    <ListGroup className="collapsible-cat">
                                        {categoriesLinksNew}
                                    </ListGroup>
                                </aside>
                                <aside className="col-12 d-lg-none categories">
                                    <ListGroup className="collapsible-cat">
                                        {categoriesLinksNew}
                                    </ListGroup>
                                </aside>

                                {this.props.selectedItem === null
                                    ? (
                                        <div className="col-lg-9 col-md-12">
                                            <header>
                                            <h2 className="h1">{rusCategoryName}</h2>
                                            </header>
                                            <ul className="products">
                                                {catalogItemsData}
                                            </ul>
                                        </div>
                                    )
                                    : (
                                        <SingleItem
                                            selectedItem={this.props.selectedItem}
                                            rusCategory={engToRusCatTitlesMap[this.props.selectedItem.category]}
                                            history={this.props.history}
                                            setCurrentItem={this.props.setCurrentItem}
                                        />
                                    )
                                }
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        );
    }
}

CatalogItems.propTypes = {
    shop: PropTypes.object.isRequired,
    selectedItem: PropTypes.object.isRequired,
    validCategoryProvided: PropTypes.bool.isRequired,
    validItemProvided: PropTypes.bool.isRequired,
    engToRusCatTitlesMap: PropTypes.objectOf(PropTypes.string).isRequired,
    categoryName: PropTypes.string.isRequired,
    history: PropTypes.func.isRequired,
    setCurrentItem: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    shop: state.shop
});

export default connect(mapStateToProps, { setCurrentItem })(withRouter(CatalogItems));
