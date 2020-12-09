import React from "react";
import {Field, reduxForm} from 'redux-form';
import {compose} from "redux";
import {connect} from "react-redux";
import {required} from "../validate/validators";

let RecordEditorForm = props => {
    const { handleSubmit, pristine, reset, submitting, invalid} = props

    const handleCancel = () => {
        props.setEditMode(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div><Field name="index" component='input' type="hidden"/></div>
            <div><Field name="id" placeholder="id" component="input" type="text" validate={[required]}/></div>
            <div><Field name="firstName" placeholder="First name" component="input" type="text" validate={[required]}/></div>
            <div><Field name="lastName" placeholder="Last name" component="input" type="text" validate={[required]}/></div>
            <div><Field name="email" placeholder="E-mail" component="input" type="text" validate={[required]}/></div>
            <div><Field name="phone" placeholder="Phone number" component="input" type="text" validate={[required]}/></div>
            <div><Field name="streetAddress" placeholder="Address" component="input" type="text" validate={[required]}/></div>
            <div><Field name="city" placeholder="City" component="input" type="text" validate={[required]}/></div>
            <div><Field name="province" placeholder="State" component="input" type="text" validate={[required]}/></div>
            <div><Field name="zip" placeholder="zip" component="input" type="text" validate={[required]}/></div>
            <div><Field name="description" placeholder="description" component="textarea" type="text" validate={[required]}/></div>
            <div>
                <button type={"submit"} disabled={invalid}>Save</button>
                <button type={"button"} disabled={pristine || submitting} onClick={reset}>Reset</button>
                <button type={"button"} onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    )
}

const mapStateToProps = (state, ownProps) => ({
    form: 'editor'+ownProps.index,
});

RecordEditorForm = compose(
    connect(mapStateToProps),
    reduxForm({ enableReinitialize: true }),
)(RecordEditorForm);

//RecordEditorForm = reduxForm({form: 'RowEditor', enableReinitialize: true })(RecordEditorForm);

let RowEditor = props => {
    const handleSubmit = (formData) => {
        props.updateDataset(formData);
        console.log(formData);
        props.setEditMode(false);
    }

    let reactKey = 'addRecord';
    if (props.recordData) reactKey = props.recordData.index;

    return (
        <tr key={reactKey}>
            <td colSpan={6}>
                <div>
                    <RecordEditorForm setEditMode={props.setEditMode}
                                      onSubmit={handleSubmit}
                                      initialValues={props.recordData}
                                      index={reactKey}
                    />
                </div>
            </td>
        </tr>
    )
}

export default RowEditor;