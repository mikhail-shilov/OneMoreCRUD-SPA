import React from 'react';
import css from './table.module.css';

class TableEditor extends React.Component {
    state = {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    }

    draftUpdate = (event) => {
        if (event.target.dataset.digit) {
            if (!Number.isNaN(event.target.value * 1)) {
                this.setState({[event.target.name]: event.target.value})
            }
        } else this.setState({[event.target.name]: event.target.value});
    }


    insertHandler = () => {
        this.props.insertToDataset(this.state.id, this.state.firstName, this.state.lastName, this.state.email, this.state.phone);
    }


    render() {
        const id = this.state.id;
        const firstName = this.state.firstName;
        const lastName = this.state.lastName;
        const email = this.state.email;
        const phone = this.state.phone;


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
            <tr key={'editFields'}>
                <td>
                    <input name='id'
                           value={this.state.id}
                           autoFocus
                           onChange={this.draftUpdate}
                           onDoubleClick={this.draftUpdate}
                           data-digit
                    />
                </td>
                <td>
                    <input name='firstName'
                           value={this.state.firstName}
                           onChange={this.draftUpdate}
                    />
                </td>
                <td className={css.col1}>
                    <input name='lastName'
                           value={this.state.lastName}
                           onChange={this.draftUpdate}
                    />
                </td>
                <td className={css.col1}>
                    <input name='email'
                           value={this.state.email}
                           onChange={this.draftUpdate}
                    />
                </td>
                <td className={css.col1}>
                    <input name='phone'
                           value={this.state.phone}
                           onChange={this.draftUpdate}
                           data-digit
                    />
                </td>
            </tr>,
            <tr key={'editControls'}>
                <td colSpan='5'>
                    <button className='datasetMenu__button'
                            onClick={this.insertHandler}
                            disabled={fillChecker(id, firstName, lastName, email, phone)}>
                        Save record

                    </button>
                    <button className='datasetMenu__button'
                            onClick={() => this.props.switchEditor(false)}>Cancel
                    </button>
                </td>
            </tr>
        ]);
    }
}


export default TableEditor;
