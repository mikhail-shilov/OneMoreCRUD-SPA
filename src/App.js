import React from 'react';
import {NavLink, Route} from "react-router-dom";

import './App.css';
import Filter from "./components/Filter";
import DatasetMenu from "./components/DatasetMenu";
import Table from "./components/Table/Table";
import FullData from "./components/FullData";
import Settings from "./components/Settings";
import Pagination from "./components/Pagination";

function App(props) {
    return (
        <div className="App">
            <header className="App-header">
                <NavLink to={'/settings'} className={'settingsBtn'}>&#9776;</NavLink>
                {(props.datasetType) ? <Filter/> : "Please select dataset for initialization..."}
            </header>
            <main className="App-main">

                <Route path='/' exact render={() => !(props.datasetType)
                    ? <DatasetMenu
                        isFetching={props.isFetching}
                        getDataset={props.getDataset}/>
                    : <Table /> }/>
                <Route path='/' exact render={() => <Pagination/>}/>
                <Route path='/settings' component={Settings}/>


            </main>
            <footer className="App-footer">
                {(props.datasetType) ? <FullData userCard={props.userCard}/> : null}

            </footer>
        </div>
    );
}

export default App;
