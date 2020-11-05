import React, {useState} from 'react';

function TableRow(props) {
    const [editMode, toggleEditMode] = useState(false);

    const clickHandler = () => {
        props.setUserCard(
            props.id,
            props.firstName,
            props.lastName,
            props.email,
            props.phone,
            props.description,
            props.address)
    }

    const doubleClickHandler = () => {
        if (editMode) {
            toggleEditMode(false)
        } else {
            toggleEditMode(true)
        }
    }

    const deleteHandler = (index) => {
        console.log(index);
        props.deleteRecord(index);
    }


    const viewer = () => {
        return (
            <tr onClick={clickHandler}
                onDoubleClick={doubleClickHandler}>
                <td>{props.id}</td>
                <td>{props.firstName}</td>
                <td>{props.lastName}</td>
                <td>{props.email}</td>
                <td>{props.phone}</td>
                <td>
                    <button onClick={doubleClickHandler}>Edit</button>
                    <button onClick={() => {deleteHandler(props.index)}}>Delete</button>
                </td>
            </tr>
        )
    }

    const editor = () => {
        return (
            <tr onClick={clickHandler}>
                <td><input value={props.id}/></td>
                <td><input value={props.firstName}/></td>
                <td><input value={props.lastName}/></td>
                <td><input value={props.email}/></td>
                <td><input value={props.phone}/></td>
                <td>
                    <button onClick={doubleClickHandler}>Save</button>
                    <button onClick={doubleClickHandler}>Cancel</button>
                </td>
            </tr>
        )
    }

    return (
        <>
            {editMode ? editor() : viewer()}
        </>
    );
}

export default TableRow;
