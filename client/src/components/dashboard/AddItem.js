import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addItem, getCategories, getCatalog } from '../../actions/shopActions';

class AddItem extends Component {
    state = {
        category: '',
        categoryId: '',
        longtitle: '',
        externalurl: '',
        title: '',
        price: '',
        current: false,
        description: '',
        errors: {},
        disabled: false,
        options: []
    };

    componentDidMount() {
        this.props.getCatalog();
        this.props.getCategories();
        console.log('[AddItem] componentDidMount');
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
        const { categories } = this.props.shop;
        if (!this.props.shop.categoriesLoading && !this.props.shop.catalogLoading) {
            const opts = categories.map(category => ({
                label: category.russtitle,
                value: category.title,
                categoryId: category._id
            }));

            this.setState({ options: [
                    { label: '* Выбрать категорию', value: 0, categoryId: '' },
                    ...opts
                ] });
            // options = [
            //     { label: '* Выбрать категорию', value: 0, categoryId: '' },
            //     ...opts
            // ];
            console.log('options: ', this.state.options);
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const itemData = {
            image: this.state.image,
            longtitle: this.state.longtitle,
            externalurl: this.state.externalurl,
            category: this.state.category,
            categoryId: this.state.categoryId,
            title: this.state.title,
            price: this.state.price,
            current: this.state.current,
            description: this.state.description
        };
        this.props.addItem(itemData, this.props.history);
    };

    onSelectCategory = (e) => {
        const catId = this.state.options.filter((item) => item.value === e.target.value)[0].categoryId;
        console.log('&&&&&&&&& catID', catId);
        console.log('&&&&&&&&& ', e.target.name, e.target.value);
        this.setState({
            [e.target.name]: e.target.value,
            categoryId: catId
        });
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onCheck = (e) => {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        });
    };

    render() {
        const { errors } = this.state;
        // const { categories } = this.props.shop;
        // const { errors } = this.state;
        // const options = [];
        // if (!this.props.shop.categoriesLoading && !this.props.shop.catalogLoading) {
        //     const opts = categories.map(category => ({
        //         label: category.russtitle,
        //         value: category.title,
        //         categoryId: category._id
        //     }));
        //
        //     this.setState({ options: [
        //         { label: '* Выбрать категорию', value: 0, categoryId: '' },
        //         ...opts
        //     ] });
        //     // options = [
        //     //     { label: '* Выбрать категорию', value: 0, categoryId: '' },
        //     //     ...opts
        //     // ];
        //     console.log('options: ', options);
        // }
        return (
            <div className="add-experience">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Назад
                            </Link>
                            <h1 className="display-4 text-center">
                                Добавить товар
                            </h1>
                            <small className="d-block pb-3">
                                * = обязательное поле
                            </small>
                            <form onSubmit={this.onSubmit}>
                                <SelectListGroup
                                    name="category"
                                    onChange={this.onSelectCategory}
                                    placeholder="Категория"
                                    value={this.state.category}
                                    error={errors.category}
                                    options={this.state.options}
                                    info="* Категория"
                                />
                                <TextFieldGroup
                                    name="title"
                                    onChange={this.onChange}
                                    placeholder="Название"
                                    value={this.state.title}
                                    error={errors.title}
                                    info="* Название"
                                />
                                <TextFieldGroup
                                    name="price"
                                    onChange={this.onChange}
                                    placeholder="Цена"
                                    value={this.state.price}
                                    error={errors.price}
                                    info="Цена"
                                />
                                <TextFieldGroup
                                    name="image"
                                    onChange={this.onChange}
                                    placeholder="Картинка"
                                    value={this.state.image}
                                    error={errors.image}
                                    info="Ссылка на картинку"
                                />
                                <TextAreaFieldGroup
                                    name="longtitle"
                                    onChange={this.onChange}
                                    placeholder="Технические характеристики кратко"
                                    value={this.state.longtitle}
                                    error={errors.longtitle}
                                    info="Технические характеристики кратко"
                                />
                                <TextAreaFieldGroup
                                    name="description"
                                    onChange={this.onChange}
                                    placeholder="Описание товара"
                                    value={this.state.description}
                                    error={errors.description}
                                    info="Описание товара"
                                />
                                <input type="submit" value="Сохранить" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddItem.propTypes = {
    addItem: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    getCatalog: PropTypes.func.isRequired,
    shop: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    shop: state.shop,
    errors: state.errors
});

export default connect(mapStateToProps, { addItem, getCategories, getCatalog })(withRouter(AddItem));
