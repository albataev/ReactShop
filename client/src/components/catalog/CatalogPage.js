/* eslint-disable react/forbid-prop-types,jsx-a11y/anchor-is-valid,react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ListGroup, Button } from 'reactstrap';
import SingleItem from './SingleItem';
import CategoriesLinks from './CategoriesLinks';
import ItemsDisplayedOnPage from './ItemsDisplayedOnPage';
import { setCurrentItem } from '../../actions/shopActions';


// main page display catalog
class CatalogPage extends Component {

    state = {
        isMobile: false,
        width: window.innerWidth,
        activeCatId: this.props.activeCatId,
        height: '0'
    };

    handleWindowResize = () => {
        setInterval(() => {
            if (this.state.width !== window.innerWidth) {
                this.setState({
                    isMobile: window.innerWidth < 992,
                    width: window.innerWidth
                });
            }
        }, 50);
    };

    componentDidMount() {
        console.log('***************************Catalog page Mounted**********************');
        // if (his.props)
        this.setState({ isMobile: window.innerWidth < 992 });
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    toggleOpen = () => {
        if (this.state.height === '0') {
            this.setState({ height: '100%' });
        } else {
            this.setState({ height: '0' });
        }
    };

    onCatClick = (catId) => {
        this.setState({ activeCatId: catId });
        window.scrollTo(0, 0);
        this.toggleOpen();
    };

    onItemClick = (catId) => {
        this.setState({ activeCatId: catId });
        window.scrollTo(0, 0);
    };

    render() {
        let categoriesLinks;
        const { isMobile } = this.state;
        if (isMobile) {
            categoriesLinks = (
                <aside className="col-12 categories">
                    <Button onClick={this.toggleOpen} className="btn-block btn-warning">
                        Выбрать категорию товара:
                    </Button>
                    <ListGroup
                        className="collapsible-cat"
                        style={{ height: this.state.height, transition: 'height 10ms linear 0s', overflow: 'hidden' }}
                    >
                        <CategoriesLinks
                            onCatClick={this.onCatClick}
                            categories={this.props.shop.categories}
                            activeCatId={this.state.activeCatId}
                        />
                    </ListGroup>
                </aside>
            );
        } else {
            categoriesLinks = (
                <aside className="col-3 d-none d-lg-block categories">
                    <ListGroup className="collapsible-cat">
                        <CategoriesLinks
                            onCatClick={this.onCatClick}
                            categories={this.props.shop.categories}
                            activeCatId={this.state.activeCatId}
                        />
                    </ListGroup>
                </aside>
            );
        }
        console.log('===+++===+++[CatalogPage] rendering categoryName: ', this.props.categoryName);
        console.log('===+++===+++[CatalogPage] this.props.selectedItem: ', this.props.selectedItem);
        console.log('===+++===+++[CatalogPage ] this.props.shop.catalog: ', this.props.shop.catalog);
        // filter items by category name
        // const { engToRusCatTitlesMap } = this.props;

        return (
            <section className="row">
                {categoriesLinks}
                {Object.keys(this.props.selectedItem).length === 0
                    ? (
                        <ItemsDisplayedOnPage
                            catalog={this.props.shop.catalog}
                            categoryName={this.props.categoryName}
                            onItemClick={this.onItemClick}
                            validCategoryProvided={this.props.validCategoryProvided}
                            validItemProvided={this.props.validItemProvided}
                            engToRusCatTitlesMap={this.props.engToRusCatTitlesMap}
                        />
                    )
                    : (
                        <SingleItem
                            selectedItem={this.props.selectedItem}
                            rusCategory={this.props.engToRusCatTitlesMap[this.props.selectedItem.category]}
                            history={this.props.history}
                            setCurrentItem={this.props.setCurrentItem}
                        />
                    )
                }
            </section>
        );
    }
}

CatalogPage.propTypes = {
    shop: PropTypes.object.isRequired,
    selectedItem: PropTypes.object.isRequired,
    validCategoryProvided: PropTypes.bool.isRequired,
    validItemProvided: PropTypes.bool.isRequired,
    engToRusCatTitlesMap: PropTypes.objectOf(PropTypes.string).isRequired,
    categoryName: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    setCurrentItem: PropTypes.func.isRequired,
    activeCatId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    shop: state.shop
});

export default connect(mapStateToProps, { setCurrentItem })(withRouter(CatalogPage));
