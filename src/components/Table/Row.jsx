import React, {useEffect, useState} from 'react';
import RowEditor from "./RowEditor";
import RowViewer from "./RowViewer";

function Row(props) {

    let [editMode, setEditMode] = useState(false);

    const clickOnRowHandler = () => {
        props.setUserCard(props.recordData)
    }


    return (

        <tr onClick={clickOnRowHandler}>
            {editMode ?
                <td colSpan={6}>
                    <RowEditor
                        setEditMode={setEditMode}/></td> :
                <RowViewer record={props.recordData}
                           setEditMode={setEditMode}
                           setRecordInEditor={props.setRecordInEditor}
                           deleteRecord={props.deleteRecord}/>}
        </tr>

    );
}

export default Row;
