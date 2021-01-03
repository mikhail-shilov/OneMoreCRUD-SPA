import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

const Settings = (props) => {
    const itemsPerPage = useSelector(state => state.settings.itemsPerPage);
    const dispatch = useDispatch();
    const inputHandler = event => {
        dispatch({type: 'SET-ITEMS-PER-PAGE', itemsPerPage: event.target.value})
    }
    const addItem = event => {
        dispatch({type: 'SET-ITEMS-PER-PAGE', itemsPerPage: itemsPerPage + 1})
    }
    const reduceItem = event => {
        let countOfItem = 1;
        if (itemsPerPage > 1) countOfItem = itemsPerPage - 1;
        dispatch({type: 'SET-ITEMS-PER-PAGE', itemsPerPage: countOfItem})
    }

    return (
        <div>
            <div>Количество элементов на странице</div>
            <div><input name='itemsPerPage' value={itemsPerPage} onChange={inputHandler}/>
                <button onClick={addItem}>+</button>
                <button onClick={reduceItem}>-</button>
            </div>
            <NavLink to={'/'}>Save</NavLink>
        </div>);
}

export default Settings