import React, {useEffect, useState} from 'react';

function TableRow(props) {

    const {index, id, firstName, lastName, email, phone} = props.recordData;

    const clickOnRowHandler = () => {
        props.setUserCard(props.recordData)
    }
    const editHandler = (recordData) => {
                props.setRecordInEditor(recordData);
    }
    const deleteHandler = (index) => {
        props.deleteRecord(index)
    }

    const stopPropaganda = (e) => {
        e.stopPropagation();
    }


    return (
        <tr onClick={clickOnRowHandler}>
            <td>{id}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td onClick={stopPropaganda}>
                <button onClick={() => {
                    editHandler(props.recordData)
                }}>Edit
                </button>
                <button onClick={() => {
                    deleteHandler(index)
                }}>Delete
                </button>
            </td>
        </tr>
    );
}

export default TableRow;
