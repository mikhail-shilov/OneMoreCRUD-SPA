import React, {useState} from 'react';
import {connect, useSelector} from "react-redux";
import css from './table.module.css'
import {applyDelete, applyInsert, applySort, applyUpdate, setUserCard} from "../../redux/data-reducer";
import Row from "./Row";
import RowEditor from "./RowEditor";

function Table(props) {
    const theadHandler = (event) => {
        props.applySort(event.target.name);
    }
    const [isActiveEditor, setActiveEditor] = useState(false);
    const addButtonHandler = () => {
        setActiveEditor(true);
    }

    const theadBuilder = (columnsList) => {
        const columnNames = columnsList.map((column, index) =>
            <td key={index}>
                <button className={css.thead_btn} name={column.name} onClick={theadHandler}>
                    {column.label}
                    {(props.sortMode === column.name) ?
                        ((props.sortDirection === 'asc') ? ' ▲' : ' ▼') :
                        ''}
                </button>
            </td>
        )

        return <tr>
            {columnNames}
            <td>
                <button onClick={addButtonHandler} disabled={isActiveEditor}>Add</button>
            </td>
        </tr>
    }

    const editorBuilder = (mode) => {
        if (mode) return <RowEditor setActiveEditor={setActiveEditor} submit={props.applyInsert}/>;
        return null;
    }

    const columnCount = props.tableColumns.length + 1;
    const itemsPerPage = useSelector(state => state.settings.itemsPerPage); //Check hook using
    const startItem = itemsPerPage * (props.currentPage - 1);
    const endItem = itemsPerPage * props.currentPage;
    const rowsBuilder = (data, start, end, numberOfColumns) => {
        const rows = data.slice(start, end).map(row => <Row key={row.index}
                                                            recordData={row}
                                                            setUserCard={props.setUserCard}
                                                            applyUpdate={props.applyUpdate}
                                                            applyDelete={props.applyDelete}/>);
        return ((data.length > 0) ? rows : <tr>
            <td colSpan={numberOfColumns}>No records</td>
        </tr>);
    }

    return (
        <div className='container'>
            <table border='1' cellSpacing='0' className={css.table}>
                <thead>
                {theadBuilder(props.tableColumns)}
                </thead>
                <tbody>
                {editorBuilder(isActiveEditor)}
                {rowsBuilder(props.tableData, startItem, endItem, columnCount)}
                </tbody>
            </table>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        tableColumns: state.data.settings.listColumnsOfTable,
        tableData: state.data.tableDataOutput,
        sortMode: state.data.settings.sortMode,
        sortDirection: state.data.settings.sortDirection,
        currentPage: state.data.settings.currentPage,
        isFetching: state.data.settings.isFetching,
    }
};

export default connect(mapStateToProps, {
    applySort,
    setUserCard,
    applyInsert,
    applyUpdate,
    applyDelete
})(Table);