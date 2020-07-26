import React from 'react';
import css from './table.module.css';

function TableEditor(props) {
    const inputHandler = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;
        props.updateEditor(inputName, inputValue);
    }
    const insertHandler = () => {
        props.insertToDataset();
    }

    const id = props.editor.user.id;
    const firstName = props.editor.user.firstName;
    const lastName = props.editor.user.lastName;
    const email = props.editor.user.email;
    const phone = props.editor.user.phone;


    const fillChecker = (field1, field2, field3, field4, field5) => {
        if (field1.length === 0 ||
            field2.length === 0 ||
            field3.length === 0 ||
            field4.length === 0 ||
            field5.length === 0) {
            return true;
        } else return false;
    }


    return ([
        <tr>
            <td>
                <input name='id'
                       value={props.editor.user.id}
                       autoFocus
                       onChange={inputHandler}
                />
            </td>
            <td>
                <input name='firstName'
                       value={props.editor.user.firstName}
                       onChange={inputHandler}
                />
            </td>
            <td className={css.col1}>
                <input name='lastName'
                       value={props.editor.user.lastName}
                       onChange={inputHandler}
                />
            </td>
            <td className={css.col1}>
                <input name='email'
                       value={props.editor.user.email}
                       onChange={inputHandler}
                />
            </td>
            <td className={css.col1}>
                <input name='phone'
                       value={props.editor.user.phone}
                       onChange={inputHandler}
                />
            </td>
        </tr>,
        <tr>
            <td colSpan='5'>
                <button className='datasetMenu__button'
                        onClick={insertHandler}
                        disabled={fillChecker(id, firstName, lastName, email, phone)}>
                    Save record

                </button>
                <button className='datasetMenu__button'
                        onClick={() => props.switchEditor(false)}>Cancel
                </button>
            </td>
        </tr>
    ]);
}

export default TableEditor;
