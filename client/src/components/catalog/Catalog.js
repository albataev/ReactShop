import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import getSlug from 'speakingurl';
import CatalogPage from './CatalogPage';
import Spinner from '../common/Spinner';
import { getCatalog, getCategories } from '../../actions/shopActions';

class Catalog extends Component {
    componentDidMount() {
        this.props.getCatalog();
        this.props.getCategories();
    }

    render() {
        let validItemProvided = true;
        let itemNameFromUrl = null;
        let selectedItem = {};
        let catNameFromUrl = 'all';
        let filteredCat;
        let filteredCatId = '';
        const engToRusCatTitlesMap = {};
        const { categories } = this.props.shop;
        const isCategoryNameValid = (categoryEngTitleFromUrl, engToRusCatTitlesMap) => (
            engToRusCatTitlesMap[categoryEngTitleFromUrl] !== undefined) || (categoryEngTitleFromUrl === 'all'
        );
        const { catalog, catalogLoading, categoriesLoading } = this.props.shop;
        let catalogContent;
        const parsedUrl = this.props.location.pathname.split('/');
        for (let i = 0; i < Object.keys(categories).length; i += 1) {
            engToRusCatTitlesMap[categories[i].title] = categories[i].russtitle;
        }
        if (parsedUrl.length === 2) {
            // URL contains '/' only
            catNameFromUrl = 'all';
        } else if (parsedUrl.length > 3) {
            // URL contains category name and item name /[catNameFromUrl]/[itemNameFromUrl]
            // all other data after /[catNameFromUrl]/[itemNameFromUrl]/[...other data]/[other data] ignored
            [,, catNameFromUrl, itemNameFromUrl] = parsedUrl;
        } else if (parsedUrl.length === 3) {
            // URL contains category name '/[catNameFromUrl]'
            [,, catNameFromUrl] = parsedUrl;
        }
        if (itemNameFromUrl !== null && isCategoryNameValid(catNameFromUrl, engToRusCatTitlesMap)) {
            const filteredItem = this.props.shop.catalog.filter((item) => getSlug(item.title, { lang: 'ru' }) === itemNameFromUrl);
            if (filteredItem.length === 1) {
                [selectedItem] = filteredItem;
            } else {
                validItemProvided = false;
            }
        }
        filteredCat = categories.filter((category) => category.title === catNameFromUrl);
        if (isCategoryNameValid(catNameFromUrl, engToRusCatTitlesMap) && filteredCat !== undefined && filteredCat.length === 1) {
            filteredCatId = filteredCat[0]._id;
        }
        if (catalog === null || catalog === [] || catalogLoading || categoriesLoading) {
            catalogContent = <Spinner />;
        } else {
            catalogContent = (
                <CatalogPage
                    shop={this.props.shop}
                    validCategoryProvided={isCategoryNameValid(catNameFromUrl, engToRusCatTitlesMap)}
                    validItemProvided={validItemProvided}
                    categoryName={catNameFromUrl}
                    selectedItem={selectedItem}
                    engToRusCatTitlesMap={engToRusCatTitlesMap}
                    activeCatId={filteredCatId}
                />
            );
        }
        return (
            <div className="container">
                { catalogContent }
            </div>
        );
    }
}

Catalog.propTypes = {
    shop: PropTypes.object.isRequired,
    getCatalog: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    shop: state.shop
});

export default connect(mapStateToProps, { getCatalog, getCategories })(withRouter(Catalog));
