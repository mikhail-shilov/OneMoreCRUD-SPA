import React from 'react';
import Table from "./table/Table";
import PreLoader from "./PreLoader";

function DatasetMenu(props) {

    if (props.isFetching) return <PreLoader/>
    else
        return (
            <div className="datasetMenu">
                <button className='datasetMenu__button' onClick={() => {
                    props.getDataset('SMALL')
                }}>Small Dataset
                </button>
                <button className='datasetMenu__button' onClick={() => {
                    props.getDataset('BIG')
                }}>Big Dataset
                </button>
            </div>

        );
}

export default DatasetMenu;
