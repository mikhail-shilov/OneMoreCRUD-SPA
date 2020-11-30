import React from "react";
import {Field, reduxForm} from 'redux-form';
import {compose} from "redux";
import {connect} from "react-redux";

let RecordEditorForm = props => {
    const handleCancel = () => {
        props.setEditMode(false);
    }

    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field name="index" component='input' type="hidden"/></div>
            <div><Field name="id" placeholder="id" component="input" type="text"/></div>
            <div><Field name="firstName" placeholder="First name" component="input" type="text"/></div>
            <div><Field name="lastName" placeholder="Last name" component="input" type="text"/></div>
            <div><Field name="email" placeholder="E-mail" component="input" type="text"/></div>
            <div><Field name="phone" placeholder="Phone number" component="input" type="text"/></div>
            <div><Field name="streetAddress" placeholder="Address" component="input" type="text"/></div>
            <div><Field name="city" placeholder="City" component="input" type="text"/></div>
            <div><Field name="province" placeholder="State" component="input" type="text"/></div>
            <div><Field name="zip" placeholder="zip" component="input" type="text"/></div>
            <div><Field name="description" placeholder="description" component="textarea" type="text"/></div>
            <div>
                <button type={"submit"}>Save</button>
                <button type={"reset"} onClick={handleCancel}>Cancel</button>
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
        //props.insertData(formData);
        //props.updateDataset(formData);
        console.log(formData);
    }


    return (
        <tr key={props.recordData.index}>
            <td colSpan={6}>
                <div>
                    <RecordEditorForm setEditMode={props.setEditMode}
                                      onSubmit={handleSubmit}
                                      initialValues={props.recordData}
                                      index={props.recordData.index}
                    />
                </div>
            </td>
        </tr>
    )
}

export default RowEditor;