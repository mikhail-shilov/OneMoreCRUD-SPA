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

    const editHandler = (e) => {
        if (editMode) {
            toggleEditMode(false)
        } else {
            toggleEditMode(true)
        }
    }

    const deleteHandler = (index) => {
        props.deleteRecord(index);
    }

    const stopPropaganda = (e) => {
        e.stopPropagation();
    }


    const viewer = () => {
        return (
            <tr onClick={clickHandler}>
                <td>{props.id}</td>
                <td>{props.firstName}</td>
                <td>{props.lastName}</td>
                <td>{props.email}</td>
                <td>{props.phone}</td>
                <td onClick={stopPropaganda}>
                    <button onClick={editHandler}>Edit</button>
                    <button onClick={(e) => {
                        deleteHandler(props.index);
                    }}>Delete
                    </button>
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
                    <button onClick={editHandler}>Save</button>
                    <button onClick={editHandler}>Cancel</button>
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
