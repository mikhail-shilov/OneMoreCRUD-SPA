import React from 'react';
import Pagination from "./Pagination";
import css from './table.module.css'
import TableRow from "./TableRow";

function Table(props) {

    const reSortTable = (event) => {
        let mode = event.target.name;
        props.sortTable(mode);
    }

    const rowNames = props.tableColumns.map(
        column =>
            <td>
                <a name={column.name} onClick={reSortTable}>
                    {column.label}
                    {(props.sortMode === column.name) ? (props.sortDirection === 'asc') ? ' ▲' : ' ▼' : ''}
                </a>
            </td>
    )

    const startItem = props.itemsPerPage*(props.currentPage-1);
    const endItem = props.itemsPerPage*props.currentPage;
    const itemsCount = props.tableData.length;
    let rows = props.tableData.slice(startItem, endItem);
    console.log(rows);

    rows=rows.map(
        row =>
            <TableRow
                id={row.id}
                firstName={row.firstName}
                lastName={row.lastName}
                email={row.email}
                phone={row.phone}
                loadItemToEditor={props.loadItemToEditor}
            />
    );

    return (
        <div>
            <span>{(props.activeFilter) ? 'Результаты поиска по запросу «'+props.activeFilter+'»':  '' }</span>
            <table border='1' cellSpacing='0' className={css.table}>
                <thead>
                <tr>
                    {rowNames}
                </tr>
                </thead>
                <tbody>
                {(props.isDataLoading) ? <tr><td colSpan="5" rowSpan="10">Загрузка...</td></tr> : rows}
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
