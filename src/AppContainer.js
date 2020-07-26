import React from "react";
import {connect} from 'react-redux';
import App from "./App";
import {getDataset, setCurrentPage, setFilter, setSortMode, setUserCard, updateDraft} from "./redux/data-reducer";


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
        userCard: state.data.userCard
    }
};

const AppContainer = connect(mapStateToProps, {getDataset, setFilter, setSortMode, updateDraft, setUserCard, setCurrentPage})(App);

export default AppContainer;