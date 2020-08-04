import React from 'react';
import './App.css';
import Filter from "./components/Filter";
import DatasetMenu from "./components/DatasetMenu";
import Table from "./components/table/Table";
import FullData from "./components/FullData";

function App(props) {
    return (
        <div className="App">
            <header className="App-header">
                {(props.datasetType)
                    ? <Filter
                        filterState={props.filter}
                        updateDraft={props.updateDraft}
                        setFilter={props.setFilter}
                    />: "Please select dataset for initialization..." }
            </header>
            <main className="App-main">
                {!(props.datasetType)
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
                    />}


            </main>
            <footer className="App-footer">
                {(props.datasetType)? <FullData userCard={props.userCard}/>: null }

            </footer>
        </div>
    );
}

export default App;
