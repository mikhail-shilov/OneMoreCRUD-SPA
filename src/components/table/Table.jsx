import React from 'react';
import Pagination from "./Pagination";
import css from './table.module.css'
import TableRow from "./TableRow";
import TableEditor from "./TableEditor";

function Table(props) {

    const reSortTable = (event) => {
        let mode = event.target.name;
        props.applySort(mode);
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

    const startItem = props.itemsPerPage * (props.currentPage - 1);
    const endItem = props.itemsPerPage * props.currentPage;
    const itemsCount = props.tableData.length;
    let rows = props.tableData.slice(startItem, endItem);

    rows = rows.map(
        row =>
            <TableRow
                id={row.id}
                firstName={row.firstName}
                lastName={row.lastName}
                email={row.email}
                phone={row.phone}
                description={row.description}
                address={row.address}
                setUserCard={props.setUserCard}
            />
    );

    return (
        <div className='container'>
            <button disabled={props.isEditorActive}
                    className='datasetMenu__button'
                    onClick={() => props.switchEditor(true)}>
                Add record
            </button>

            <table border='1' cellSpacing='0' className={css.table}>
                <thead>
                <tr>
                    {rowNames}
                </tr>
                </thead>
                <tbody>
                {props.isEditorActive ?
                    <TableEditor isEditorActive={props.isEditorActive}
                                 switchEditor={props.switchEditor}
                                 updateEditor={props.updateEditor}
                                 insertToDataset={props.insertToDataset}
                    /> : null}
                {rows}
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
