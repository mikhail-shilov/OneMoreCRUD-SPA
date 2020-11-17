import React, {useEffect, useState} from 'react';
import RowEditor from "./RowEditor";

function RowViewer(props) {

    const {index, id, firstName, lastName, email, phone} = props.record;


    const editHandler = (recordData) => {
        props.setRecordInEditor(recordData);
        props.setEditMode(true);
    }
    const deleteHandler = (index) => {
        props.deleteRecord(index)
    }

    const stopPropaganda = (e) => {
        e.stopPropagation();
    }


    return (
        <>
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
        </>
    );
}

export default RowViewer;
