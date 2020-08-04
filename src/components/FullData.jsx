import React from 'react';

function FullData(props) {

    if (props.userCard) {
        if (props.userCard.address) {
            return (
                <div className='container'>
                    <div className='userFullData'>
                        <div className='userFullData__col1'>
                            <span
                                className='userFullData__label'>Выбран пользователь <strong>{props.userCard.firstName} {props.userCard.lastName}</strong></span>
                            <span
                                className='userFullData__label'>Адрес проживания: <b>{props.userCard.address.streetAddress}</b></span>
                            <span className='userFullData__label'>Город: <b>{props.userCard.address.city}</b></span>
                            <span className='userFullData__label'>Провинция/штат: <b>{props.userCard.address.state}</b></span>
                            <span className='userFullData__label'>Индекс: <b>{props.userCard.address.zip}</b></span>
                        </div>
                        <div className='userFullData__col2'>
                            <span className='userFullData__label'>Описание: <textarea
                                className='userFullData__description'
                                value={props.userCard.description}></textarea></span>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='container'>
                    <div className='userFullData'>
                        <div className='userFullData__col1'>
                            <span
                                className='userFullData__label'>Выбран пользователь <strong>{props.userCard.firstName} {props.userCard.lastName}</strong></span>
                            <span className='userFullData__label'>No extended data</span>
                        </div>
                    </div>
                </div>)
        }
    } else {
        return <div>Click to row, for more information...</div>
    }

}

export default FullData;