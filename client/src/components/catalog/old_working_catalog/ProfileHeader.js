import React, {Component} from 'react';
import isEmpty from '../../validation/is-empty';

class ProfileHeader extends Component {
  render() {

    const { profile } = this.props;
    let faIconClassnameStart = 'fab fa-';

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">Digdi.ru</h1>
              <p className="lead text-center">
                Каталог товаров
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
