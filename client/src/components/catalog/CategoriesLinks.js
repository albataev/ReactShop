import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import Collapsible from 'react-collapsible';

function CategoriesLinks(props) {
    const categoriesLinksNew = [];
    const categoriesHeader = (
        <ListGroupItem key="header" aria-labelledby="categoriesheader">
            <Link onClick={() => props.onCatClick('')} to={{ pathname: '/' }}>
                <span className="categories-left-header"><i className="fa fa-list-ul" /> Каталог</span>
            </Link>
        </ListGroupItem>
    );
    categoriesLinksNew[0] = categoriesHeader;
    for (let i = 0; i < props.categories.length; i++) {
        const collapsedChildItems = [];
        if (props.categories[i].hasChildren) {
            // iterate on all categories to get child categories for current
            const parentCatId = props.categories[i]._id;
            for (let childCatIndex = 0; childCatIndex < props.categories.length; childCatIndex++) {
                if (props.categories[childCatIndex].parent !== undefined
                    && props.categories[childCatIndex].parent === parentCatId) {
                    collapsedChildItems.push(
                        <ListGroupItem
                            key={props.categories[childCatIndex]._id}
                            onClick={() => props.onCatClick(props.categories[childCatIndex]._id)}
                            aria-labelledby="dropdownMenuLink"
                            className={props.activeCatId === props.categories[childCatIndex]._id ? 'active-cat' : ''}
                        >
                            <Link to={{ pathname: `/tovary/${props.categories[childCatIndex].title}` }}>
                                {props.categories[childCatIndex].russtitle}
                            </Link>
                        </ListGroupItem>
                    );
                }
            }
            categoriesLinksNew.push(
                <ListGroupItem
                    key={props.categories[i]._id}
                    aria-expanded="false"
                    className={props.activeCatId === props.categories[i]._id
                        ? 'cat-item collapsible-item active-cat'
                        : 'cat-item collapsible-item'}
                >
                    <Collapsible
                        // contentContainerTagName="li"
                        triggerTagName="div"
                        transitionTime={400}
                        transitionCloseTime={50}
                        className="menu-item"
                        trigger={`${props.categories[i].russtitle} `}
                    >
                        <ul>
                            {collapsedChildItems}
                        </ul>
                    </Collapsible>
                </ListGroupItem>

            );
        } else if (!props.categories[i].hasChildren
            && (props.categories[i].parent === undefined
                || props.categories[i].parent.length === 0)) {
            categoriesLinksNew.push(
                <ListGroupItem
                    key={props.categories[i]._id}
                    className={props.activeCatId === props.categories[i]._id
                        ? 'vertical-menu dropdown-menu menu-item active-cat'
                        : 'vertical-menu dropdown-menu menu-item'}
                >
                    <Link
                        onClick={() => props.onCatClick(props.categories[i]._id)}
                        to={{ pathname: `/tovary/${props.categories[i].title}` }}
                    >
                        {props.categories[i].russtitle}
                    </Link>
                </ListGroupItem>
            );
        }
    }
    return (
        categoriesLinksNew
    );
}

CategoriesLinks.propTypes = {
    categories: PropTypes.array.isRequired,
    onCatClick: PropTypes.func.isRequired,
    activeCatId: PropTypes.string.isRequired
};

export default CategoriesLinks;
