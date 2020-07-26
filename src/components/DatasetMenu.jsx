import React from 'react';

function DatasetMenu(props) {

    return (
        <div className="datasetMenu">
            <button className='datasetMenu__button' onClick={() => {props.getDataset('SMALL')}}>Малый набор</button>
            <button className='datasetMenu__button' onClick={() => {props.getDataset('BIG')}}>Большой набор</button>
        </div>
    );
}

export default DatasetMenu;
