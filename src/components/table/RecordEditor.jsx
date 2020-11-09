import React from "react";
import {Field, reduxForm} from 'redux-form';

let RecordEditorForm = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>{props.initialValues.index}</div>
            <div><Field name="index" component='input' type="hidden"/></div>
            <div><Field name="id" placeholder="id"  component="input" type="text"/></div>
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
                <button type={"reset"}>Cancel</button>
            </div>
        </form>
    )
}

RecordEditorForm = reduxForm({form: 'RecordEditor'})(RecordEditorForm);

let RecordEditor = props => {
    const handleSubmit = (formData) => {
        props.insertData(formData);
        console.log(formData);
    }

    return (
        <div>
            <RecordEditorForm onSubmit={handleSubmit} initialValues={{'id': '131'}}/>
        </div>
    )
}

export default RecordEditor;