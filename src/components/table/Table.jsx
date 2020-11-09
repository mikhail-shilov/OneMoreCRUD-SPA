import React from 'react';
import Pagination from "./Pagination";
import css from './table.module.css'
import TableRow from "./TableRow";
import TableAddRow from "./TableAddRow";
import {useSelector} from "react-redux";
import InTableEditor from "./InTableEditor";
import RecordEditor from "./RecordEditor";

function Table(props) {
    const itemsPerPage = useSelector(state => state.settings.itemsPerPage);

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
            <TableRow
                key={row.index}
                index={row.index}
                id={row.id}
                firstName={row.firstName}
                lastName={row.lastName}
                email={row.email}
                phone={row.phone}
                description={row.description}
                address={row.address}
                setUserCard={props.setUserCard}
                deleteRecord={props.deleteRecord}
            />
    );


    return (
        <div className='container'>
            <button disabled={props.isEditorActive}
                    className='datasetMenu__button'
                    onClick={() => props.switchEditor(true)}>
                Add record
            </button>
            <RecordEditor insertData={props.insertToDatasetFull}/>
            <table border='1' cellSpacing='0' className={css.table}>
                <thead>
                <tr>
                    {rowNames}
                    <td>...</td>
                </tr>
                </thead>



                <tbody>


                {props.isEditorActive ?
                    <TableAddRow isEditorActive={props.isEditorActive}
                                 switchEditor={props.switchEditor}
                                 updateEditor={props.updateEditor}
                                 insertToDataset={props.insertToDataset}
                    /> : null}
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
