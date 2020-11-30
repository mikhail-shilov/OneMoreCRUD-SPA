import React, {useEffect, useState} from 'react';
import RowEditor from "./RowEditor";

function Row(props) {
    const {index, id, firstName, lastName, email, phone} = props.recordData;

    let [editMode, setEditMode] = useState(false);
   // let [recordInEditor, setRecordInEditor] = useState(null);

    const clickOnRowHandler = () => {
        props.setUserCard(props.recordData)
    }
    const editHandler = (recordData) => {
        //props.setRecordInEditor(recordData);
        //setRecordInEditor(recordData);
        setEditMode(true);
    }
    const deleteHandler = (index) => {
        props.deleteRecord(index)
    }
    const noClickHandler = (e) => {
        e.stopPropagation();
    }

    const viewer = () => {
        return <tr key={index} onClick={clickOnRowHandler}>
            <td>{id}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td onClick={noClickHandler}>
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
    }

    return (
        <>
            {!editMode ? viewer() : <RowEditor
                recordData={props.recordData}
                setEditMode={setEditMode}
            />}
        </>
    );
}

export default Row;
