import React from "react";
import {connect} from 'react-redux';
import App from "./App";
import {
    applyDelete,
    applySort,
    getDataset,
    insertToDataset, insertToDatasetFull,
    setCurrentPage,
    setFilter,
    setUserCard,
    switchEditor,
    updateDraft
} from "./redux/data-reducer";


const mapStateToProps = (state) => {
    return {
        tableColumns: state.data.settings.listColumnsOfTable,
        data: state.data.tableDataOutput,
        sortMode: state.data.settings.sortMode,
        sortDirection: state.data.settings.sortDirection,
        datasetType: state.data.settings.datasetType,
        itemsPerPage: state.data.settings.itemsPerPage,
        currentPage: state.data.settings.currentPage,
        isFetching: state.data.settings.isFetching,
        filter: state.data.filter,
        userCard: state.data.userCard,
        isEditorActive: state.data.isEditorActive
    }
};

const AppContainer = connect(mapStateToProps,
    {
        getDataset,
        setFilter,
        applySort,
        updateDraft,
        setUserCard,
        setCurrentPage,
        switchEditor,
        insertToDataset,
        insertToDatasetFull,
        applyDelete
    })(App);

export default AppContainer;