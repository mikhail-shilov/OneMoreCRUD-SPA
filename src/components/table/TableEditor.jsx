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
                onClick={insertHandler}>Save record</button>
                <button className='datasetMenu__button'
                        onClick={() => props.switchEditor(false)}>Cancel
                </button>
            </td>
        </tr>
    ]);
}

export default TableEditor;
