import React from "react";
import {connect} from 'react-redux';
import App from "./App";
import {getDataset} from "./redux/data-reducer";


const mapStateToProps = (state) => {
    return {
        tableColumns: state.data.settings.listColumnsOfTable,
        data: state.data.tableDataOutput,
        datasetType: state.data.settings.datasetType,
        currentPage: state.data.settings.currentPage,
        isFetching: state.data.settings.isFetching,
    }
};

const AppContainer = connect(mapStateToProps, {getDataset})(App);

export default AppContainer;