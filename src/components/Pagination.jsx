import React, {useEffect} from 'react';
import css from './Table/table.module.css'
import {connect, useSelector} from "react-redux";
import {setCurrentPage} from "../redux/data-reducer";

function Pagination(props) {
    const itemsOnPage = useSelector(state => state.settings.itemsPerPage);
    const totalItemsCount = props.itemsCount;
    const pagesCount = Math.ceil(totalItemsCount / itemsOnPage);

    const pagesCountUpdate = () => {
        if (props.currentPage >= pagesCount) props.setCurrentPage(pagesCount);
    }
    useEffect(pagesCountUpdate, [totalItemsCount]);

    let pagesNumbersArray = [];
    for (let i = 1; i <= pagesCount; i++) {
        pagesNumbersArray.push(i);
    }
    const paginationElements =  pagesNumbersArray.map((elem, index) =>
        <li key={'pag-'+index} className={(elem === props.currentPage) ? css.numberWrapper + ' ' + css.numberActive : css.numberWrapper}>
            <button className={css.keyboard_focus_button} tabIndex='0' onClick={() =>{props.setCurrentPage(elem)}}>
                <span tabIndex='-1' className={css.keyboard_focus_button__label}>
                    {elem}
                </span>
            </button>
        </li>
    );

    return (
        <ul className={css.paginationArea}>
            {paginationElements}
        </ul>
    );
}

const mapStateToProps = (state) => {
    return {
        itemsCount: state.data.tableDataOutput.length,
        itemsPerPage: state.data.settings.itemsPerPage,
        currentPage: state.data.settings.currentPage,
    }
};

export default connect(mapStateToProps, {setCurrentPage})(Pagination);
