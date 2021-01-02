import React, {useState} from 'react';
import Pagination from "./Pagination";
import css from './table.module.css'
import Row from "./Row";
import {useSelector} from "react-redux";
import RowEditor from "./RowEditor";

function Table(props) {
    //Read global setting item per page
    const itemsPerPage = useSelector(state => state.settings.itemsPerPage);

    const [addRecordMode, setAddRecordMode] = useState(false);
    const addHandler = () => {
        setAddRecordMode(true);
    }

    const reSortTable = (event) => {
        let mode = event.target.name;
        props.applySort(mode);
    }

    const rowNames = props.tableColumns.map(
        (column, index) =>
            <td key={index}>
                <button name={column.name} onClick={reSortTable}>
                    {column.label}
                    {(props.sortMode === column.name) ? (props.sortDirection === 'asc') ? ' ▲' : ' ▼' : ''}
                </button>
            </td>
    )

    const addRecord = () => {
        return <RowEditor setEditMode={setAddRecordMode} updateDataset={props.updateDataset}/>
    }

    const startItem = itemsPerPage * (props.currentPage - 1);
    const endItem = itemsPerPage * props.currentPage;
    const itemsCount = props.tableData.length;

    let rows = props.tableData.slice(startItem, endItem).map(
        row =>
            <Row
                key={row.index}
                recordData={row}
                setUserCard={props.setUserCard}
                updateDataset={props.updateDataset}
                deleteRecord={props.deleteRecord}
            />
    );


    return (

        <div className='container'>
            <table border='1' cellSpacing='0' className={css.table}>
                <thead>
                <tr>
                    {rowNames}
                    <td>
                        <button onClick={addHandler} disabled={addRecordMode}>Add</button>
                    </td>
                </tr>
                </thead>
                <tbody>
                {addRecordMode ? addRecord() : null}
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
