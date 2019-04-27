import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { editItem } from '../../actions/shopActions';

class EditItem extends Component {
  state = {
    errors: {},
    disabled: false
  };

  componentDidMount() {
    // получаем данные по нажатию кнопки редактирования в панели управления
    this.setState({ ...this.props.shop.editItemData });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    console.log('NWXT{PROPS', nextProps);
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  // доделать данные формы - поправить поля
  // доделать чтобы отправлялось корректно _id элемента каталога
  onSubmit = (formData) => {
    formData.preventDefault();
    const validatedPrice = this.state.price.toString().replace(' ', '');
    const itemData = {
      title: this.state.title,
      category: this.state.category,
      price: validatedPrice,
      current: this.state.current,
      image: this.state.image,
      longtitle: this.state.longtitle,
      externalurl: this.state.externalurl,
      description: this.state.description
    };
    // reset edit item data
    this.props.editItem(this.props.shop.editItemData._id, itemData, this.props.history);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // onCheck = (e) => {
  //   this.setState({
  //     disabled: !this.state.disabled,
  //     current: !this.state.current
  //   });
  // };

  render() {
    const { categories } = this.props.shop;
    const { errors } = this.state;
    let options = [];
    let inputArea = '';
    if (!this.props.shop.categoriesLoading && !this.props.shop.catalogLoading) {
      const opts = categories.map(category => ({
        label: category.russtitle,
        value: category.title
      }));
      options = [
        { label: '* Выбрать категорию', value: 0 },
        ...opts
      ];
      console.log('options in render: ', options);
      inputArea = (
        <div className="col-md-8 m-auto">
          <Link to="/dashboard" className="btn btn-light">
            Назад
          </Link>
          <h1 className="display-4 text-center">
            Редактировать товар
          </h1>
          <small className="d-block pb-3">
            * = обязательное поле
          </small>
          <form onSubmit={this.onSubmit}>
            <SelectListGroup
              name="category"
              onChange={this.onChange}
              placeholder="Категория"
              value={this.state.category}
              error={errors.category}
              options={options}
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
              value={String(this.state.price)}
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
            <TextFieldGroup
              name="externalurl"
              onChange={this.onChange}
              placeholder="Внешняя ссылка"
              value={this.state.externalurl}
              error={errors.externalurl}
              info="Внешняя ссылка"
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
      );
    }

    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            {inputArea}
          </div>
        </div>
      </div>
    );
  }
}

EditItem.propTypes = {
  editItem: PropTypes.func.isRequired,
  shop: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  shop: state.shop,
  errors: state.errors
});

export default connect(mapStateToProps, { editItem })(withRouter(EditItem));
