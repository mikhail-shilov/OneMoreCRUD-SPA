import React from 'react';

function Filter(props) {

    return (
        <div className='filter'>
            <input
                className='filter__input'
                value='{props.findString}'
                autoFocus
                placeholder='Фрагмент имени или фамилии'
            />
            <button className='filter__button'>Искать</button>
        </div>
    );
}

export default Filter;
