import React from 'react';

import Pagination from "./Pagination";
import css from './table.module.css'
import TableRow from "./TableRow";

function Table(props) {



    return (
        <div>
            <span>{(props.activeFilter) ? 'Результаты поиска по запросу «'+props.activeFilter+'»':  '' }</span>
            <table border='1' cellSpacing='0' className={css.table}>
                <thead>
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
            <Pagination
            />
        </div>
    );
}

export default Table;
