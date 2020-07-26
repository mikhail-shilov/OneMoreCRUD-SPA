import React from 'react';

function Filter(props) {


    const findHandler = () => {
        props.setFilter(props.filterState.draft);
    }
    const clearHandler = () => {
        props.updateDraft('');
        props.setFilter('');
    }
    const updateValue = (event) => {
        const text = event.target.value;
        props.updateDraft(text);
    }
    const keyHandler = (event) => {
        if (event.key === 'Enter') {
            props.setFilter(event.target.value);
        }
    };

    return (
        <div className='filter'>
            <input
                className='filter__input'
                value={props.filterState.draft? props.filterState.draft: props.filterState.activeFilter}
                autoFocus
                placeholder='Part of firstname or lastname...'
                onChange={updateValue}
                onKeyPress={keyHandler}

            />
            <button className='filter__button' onClick={findHandler}>Filter</button>
            <button className='filter__button' onClick={clearHandler}>Clear</button>
        </div>
    );
}

export default Filter;
