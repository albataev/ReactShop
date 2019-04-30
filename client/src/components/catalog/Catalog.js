import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import getSlug from 'speakingurl';
import CatalogItems from './CatalogItems';
import Spinner from '../common/Spinner';
import { getCatalog, getCategories, setCurrentItem } from '../../actions/shopActions';

class Catalog extends Component {
    componentDidMount() {
        this.props.getCatalog();
        this.props.getCategories();
    }

    render() {
        let validItemProvided = true;
        let itemNameFromUrl = null;
        let selectedItem = null;
        let catNameFromUrl = 'all';
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
        // URL contains '/' only
        if (parsedUrl.length === 2) {
            console.log('--------> [Catalog.js] no category selected');
            catNameFromUrl = 'all';
        } else if (parsedUrl.length > 3) {
            // URL contains category name and item name /[catNameFromUrl]/[itemNameFromUrl]
            // all other data after /[catNameFromUrl]/[itemNameFromUrl]/[...other data]/[other data] ignored
            console.log('--------> [Catalog.js] catNameFromUrl: ', parsedUrl[2]);
            [,, catNameFromUrl, itemNameFromUrl] = parsedUrl;
            // itemNameFromUrl = parsedUrl[3];
            console.log('--------> [Catalog.js] itemNameFromUrl: ', itemNameFromUrl);
        } else if (parsedUrl.length === 3) {
            // URL contains category name '/[catNameFromUrl]'
            console.log('--------> [Catalog.js][parsedUrl.length === 3] catNameFromUrl: ', parsedUrl[2]);
            [,, catNameFromUrl] = parsedUrl;
        }
        console.log('--------> [Catalog.js] catEgory Found?: ', isCategoryNameValid(catNameFromUrl, engToRusCatTitlesMap));
        if (itemNameFromUrl !== null && isCategoryNameValid(catNameFromUrl, engToRusCatTitlesMap)) {
            const filteredItem = this.props.shop.catalog.filter((item) => getSlug(item.title, { lang: 'ru' }) === itemNameFromUrl);
            if (filteredItem.length === 1) {
                [selectedItem] = filteredItem;
            } else {
                validItemProvided = false;
            }
        }
        console.log('--------> [Catalog.js] item selectedItem: ', selectedItem);
        if (catalog === null || catalog === [] || catalogLoading || categoriesLoading) {
            catalogContent = <Spinner />;
        } else {
            catalogContent = (
                <div>
                    <div className="container">
                        <CatalogItems
                            shop={this.props.shop}
                            validCategoryProvided={isCategoryNameValid(catNameFromUrl, engToRusCatTitlesMap)}
                            validItemProvided={validItemProvided}
                            categoryName={catNameFromUrl}
                            selectedItem={selectedItem}
                            engToRusCatTitlesMap={engToRusCatTitlesMap}
                        />
                    </div>
                </div>
            );
        }
        return (
            <div>
                {catalogContent}
            </div>
        );
    }
}

Catalog.propTypes = {
    shop: PropTypes.object.isRequired,
    getCatalog: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    setCurrentItem: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    shop: state.shop
});

export default connect(mapStateToProps, { getCatalog, getCategories, setCurrentItem })(withRouter(Catalog));
