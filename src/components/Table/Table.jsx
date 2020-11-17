import React, {useEffect, useState} from 'react';
import Pagination from "./Pagination";
import css from './table.module.css'
import Row from "./Row";
import {useSelector} from "react-redux";
import RowEditor from "./RowEditor";

function Table(props) {
    //Read global setting item per page
    const itemsPerPage = useSelector(state => state.settings.itemsPerPage);

    const [recordInEditor, setRecordInEditor] = useState(null);

    const reSortTable = (event) => {
        let mode = event.target.name;
        props.applySort(mode);
    }

    const rowNames = props.tableColumns.map(
        (column, index) =>
            <td key={index}>
                <a name={column.name} onClick={reSortTable}>
                    {column.label}
                    {(props.sortMode === column.name) ? (props.sortDirection === 'asc') ? ' ▲' : ' ▼' : ''}
                </a>
            </td>
    )

    const startItem = itemsPerPage * (props.currentPage - 1);
    const endItem = itemsPerPage * props.currentPage;
    const itemsCount = props.tableData.length;


    let rows = props.tableData.slice(startItem, endItem).map(
        row =>
            <Row
                key={row.index}
                recordData={row}

                setUserCard={props.setUserCard}
                deleteRecord={props.deleteRecord}
                setRecordInEditor={setRecordInEditor}
            />
    );


    return (

        <div className='container'>
            <table border='1' cellSpacing='0' className={css.table}>
                <thead>
                <tr>
                    {rowNames}
                    <td>
                        <button disabled={true}>Add</button>
                    </td>
                </tr>
                </thead>
                <tbody>
                {(rows.length > 0) ? rows : <td colSpan={rowNames.length + 1}>No records</td>}
                </tbody>
            </table>
            <Pagination
                currentPage={props.currentPage}
                itemsOnPage={props.itemsPerPage}
                itemsCount={itemsCount}
                setCurrentPage={props.setCurrentPage}
            />
        </div>
    );
}

export default Table;
