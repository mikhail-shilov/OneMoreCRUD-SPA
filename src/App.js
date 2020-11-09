import React from 'react';
import {NavLink, Route} from "react-router-dom";

import './App.css';
import Filter from "./components/Filter";
import DatasetMenu from "./components/DatasetMenu";
import Table from "./components/table/Table";
import FullData from "./components/FullData";
import Settings from "./components/Settings";

function App(props) {
    return (
        <div className="App">
            <header className="App-header">
                <NavLink to={'/settings'} className={'settingsBtn'}>&#9776;</NavLink>
                {(props.datasetType)
                    ? <Filter
                        filterState={props.filter}
                        updateDraft={props.updateDraft}
                        setFilter={props.setFilter}
                    /> : "Please select dataset for initialization..."}
            </header>
            <main className="App-main">

                <Route path='/' exact render={() => !(props.datasetType)
                    ? <DatasetMenu
                        isFetching={props.isFetching}
                        getDataset={props.getDataset}/>
                    : <Table
                        tableColumns={props.tableColumns}
                        sortMode={props.sortMode}
                        sortDirection={props.sortDirection}
                        itemsPerPage={props.itemsPerPage}
                        currentPage={props.currentPage}
                        tableData={props.data}
                        applySort={props.applySort}
                        setCurrentPage={props.setCurrentPage}
                        setUserCard={props.setUserCard}
                        isEditorActive={props.isEditorActive}
                        switchEditor={props.switchEditor}
                        insertToDataset={props.insertToDataset}
                        insertToDatasetFull={props.insertToDatasetFull}
                        deleteRecord={props.applyDelete}
                    />}/>
                <Route path='/settings' component={Settings}/>




            </main>
            <footer className="App-footer">
                {(props.datasetType) ? <FullData userCard={props.userCard}/> : null}

            </footer>
        </div>
    );
}

export default App;
