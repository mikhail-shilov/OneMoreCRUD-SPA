import React, {useState} from "react";
import css from "./table.module.css";

let InTableEditor = props => {

    const [id, setId] = useState('1001');
    const [name, setName] = useState('sdfsdfsdf');
    const [lastName, setLastName] = useState('Фамилdddия');
    const [email, setEmail] = useState('мэйл');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [postIndex, setPostIndex] = useState('');
    const [about, setAbout] = useState('');

    return (
        <>
            <tr>
                <td rowSpan={2}>{id}</td>
                <td><input value={name} onChange={(e) => setName(e.target.value)}/></td>
                <td><input value={lastName} onChange={(e) => setLastName(e.target.value)}/></td>
                <td><input value={email} onChange={(e) => setEmail(e.target.value)}/></td>
                <td><input value={phone} onChange={(e) => setPhone(e.target.value)}/></td>
                <td rowSpan={2}>
                    <button >Save</button>
                    <button >Cancel</button>
                </td>
            </tr>
            <tr>
                <td colSpan={2}>Адрес</td>
                <td colSpan={2}>
                    Описание
                </td>
            </tr>
        </>
    )
}


