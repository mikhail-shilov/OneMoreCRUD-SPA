import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {setFilter} from "../redux/data-reducer";

function Filter(props) {

    const [draft, setDraft] = useState('');

    useEffect(() => {
        setDraft(props.filterQuery);
    }, [props.filterQuery]);

    const findHandler = () => {
        props.setFilter(draft);
    }
    const clearHandler = () => {
        setDraft('');
        props.setFilter('');
    }
    const updateValue = (event) => {
        const text = event.target.value;
        setDraft(text);
    }
    const keyHandler = (event) => {
        if (event.key === 'Enter') {
            setDraft(event.target.value);
        }
    };

    return (
        <div className='filter'>
            <input
                className='filter__input'
                value={draft}
                placeholder={!(draft === '')? draft : 'Part of firstname or lastname...'}
                onChange={updateValue}
                onKeyPress={keyHandler}
            />
            <button className='filter__button' onClick={findHandler}>Filter</button>
            <button className='filter__button' onClick={clearHandler}>Clear</button>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.data.settings.isFetching,
        filterQuery: state.data.filter.activeFilter, //change this string to state.data.filter after edit other code
    }
};

export default connect(mapStateToProps,{setFilter})(Filter);