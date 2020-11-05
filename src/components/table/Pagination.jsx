import React, {useEffect} from 'react';
import css from './table.module.css'
import {useSelector} from "react-redux";

function Pagination(props) {

    let linksArray = [];
    //const itemsOnPage = props.itemsOnPage;
    const itemsOnPage = useSelector(state => state.settings.itemsPerPage);


    const itemsCount = props.itemsCount;
    const pagesCount = Math.ceil(itemsCount / itemsOnPage);

    for (let i = 1; i <= pagesCount; i++) {
        linksArray.push(i);
    }

    const pageRange = () => {

        if (props.currentPage >= pagesCount) props.setCurrentPage(pagesCount);
    }

    useEffect(pageRange, [itemsCount]);

    return (
        <ul className={css.paginationArea}>
            {
                linksArray.map((elem, index) =>
                    <li key={index} className={(elem === props.currentPage) ? css.numberWrapper + ' ' + css.numberActive : css.numberWrapper}>
                        <a onClick={() =>{props.setCurrentPage(elem);}}>{elem}</a>
                    </li>
                )
            }
        </ul>
    );
}

export default Pagination;
