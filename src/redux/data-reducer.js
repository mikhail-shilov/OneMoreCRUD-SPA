import {getData} from "../api/api";

const initalState = {
    settings: {
        listColumnsOfTable: [
            {name: 'id', label: 'Id'},
            {name: 'firstName', label: 'Имя'},
            {name: 'lastName', label: 'Фамилия'},
            {name: 'eMail', label: 'Почта'},
            {name: 'telNo', label: 'Телефон'},
        ],
        sortMode: null,
        sortDirection: null,
        itemsPerPage: 20,
        currentPage: 1,
        isFetching: false, //происходит ли загрузка чего либо
        datasetType: null, //Большой или малый набор данных загружен. При запуске - null.
    },
    filter: '',
    userCard: null,
    isEditorActive: false,

    dataCache: [],
    tableDataOutput: []
};

const tableReducer = (state = initalState, action) => {
    switch (action.type) {
        case 'INSERT-TABLE': {
            let localState = {...state};
            localState.settings = {...state.settings};
            localState.settings.datasetType = action.datasetType;
            localState.dataCache = action.data.map((record, index) => {
                return ({
                    index,
                    'id': record.id,
                    'firstName': record.firstName,
                    'lastName': record.lastName,
                    'email': record.email,
                    'phone': record.phone,
                    'streetAddress': (!record.address) ? null : record.address.streetAddress,
                    'city': (!record.address) ? null : record.address.city,
                    'province': (!record.address) ? null : record.address.state, //I think "state" is not best name in react+redux app.
                    'zip': (!record.address) ? null : record.address.zip,
                    'description': (!record.description) ? null : record.description,
                })
            });
            //service generate non unique ID's - add 'index' field to resolve this
            //not need address as isolated unit - transform record to flat, single layer form
            return localState;
        }
        case 'INSERT-ROW': {
            let localState = {...state};
            let {
                id, firstName, lastName, email, phone,
                streetAddress, city, province, zip, description
            } = action.record;

            //search biggest index to add new index
            let indexes = localState.dataCache.map(record => record.index);
            indexes.sort((a, b) => {
                if (a > b) return -1;
                if (a < b) return 1;
                return 0;
            });
            let index = Number(indexes[0]) + 1; //readable variant

            let record = {
                index, id, firstName, lastName, email, phone,
                description, streetAddress, city, province, zip
            };
            localState.dataCache = [record, ...state.dataCache];
            return localState;
        }
        case 'UPDATE-ROW': {
            let localState = {...state};
            let indexOfRow = localState.dataCache.findIndex(record => (record.index === action.index));
            localState.dataCache[indexOfRow] = action.record;
            return localState;
        }
        case 'DELETE-ROW': {
            let localState = {...state};
            localState.dataCache = state.dataCache.filter(record => {
                return record.index !== action.index;
            });
            return localState;
        }
        case 'SETUP-SORT': {
            let localState = {...state};
            localState.settings = {...state.settings};
            if (action.force) localState.settings.sortDirection = 'asc';
            else {
                if (localState.settings.sortMode === action.mode) {
                    if (localState.settings.sortDirection === 'asc') {
                        localState.settings.sortDirection = 'desc';
                    } else {
                        localState.settings.sortDirection = 'asc';
                    }
                } else localState.settings.sortDirection = 'asc';
            }
            localState.settings.sortMode = action.mode;
            return localState;
        }
        case 'DO-SORT': {
            let localState = {...state};
            localState.settings = {...state.settings};
            localState.dataCache = [...state.dataCache];
            if (localState.settings.sortMode !== null) {
                localState.dataCache.sort((a, b) => {
                    let elemA;
                    let elemB;
                    switch (localState.settings.sortMode) {
                        case 'id':
                            elemA = a.id;
                            elemB = b.id;
                            break
                        case 'firstName':
                            elemA = a.firstName;
                            elemB = b.firstName;
                            break
                        case 'lastName':
                            elemA = a.lastName;
                            elemB = b.lastName;
                            break
                        case 'eMail':
                            elemA = a.email;
                            elemB = b.email;
                            break
                        case 'telNo':
                            elemA = a.phone;
                            elemB = b.phone;
                            break
                        default:
                            elemA = a.id;
                            elemB = b.id;
                            break
                    }
                    if (elemA < elemB) return (localState.settings.sortDirection === 'asc') ? -1 : 1;
                    if (elemA > elemB) return (localState.settings.sortDirection === 'asc') ? 1 : -1;
                    return 0;
                });
            }
            return localState;
        }
        case 'SETUP-FILTER': {
            let localState = {...state};
            localState.settings = {...state.settings};
            localState.filter = '';
            if (action.stringToFind) localState.filter = action.stringToFind.toLowerCase();
            return localState;
        }
        case 'DO-FILTER': {
            let localState = {...state};
            localState.settings = {...state.settings};
            const activeFilter = localState.filter;
            localState.tableDataOutput = state.dataCache.filter((item) => (
                        (String(item.id).toLowerCase().includes(activeFilter)) ||
                        (item.firstName.toLowerCase().includes(activeFilter)) ||
                        (item.lastName.toLowerCase().includes(activeFilter))
                    )
            );
            return localState;
        }
        case 'SETUP-CURRENT-PAGE': {
            let localState = {...state};
            localState.settings = {...state.settings};
            if (!action.numberOfPage) localState.settings.currentPage = 1
            else localState.settings.currentPage = action.numberOfPage;
            return localState;
        }
        case 'SET-USER-CARD': {
            //move to other reducer, I think
            let localState = {...state};
            localState.userCard = action.user;
            return localState;
        }
        case 'PRELOADER-SWITCH': {
            let localState = {...state};
            localState.settings = {...state.settings};
            localState.settings.isFetching = action.mode;
            return localState;
        }
        default: {
            return state;
        }
    }
};
export default tableReducer;

export const insertTable = (data, datasetType) => ({type: 'INSERT-TABLE', data, datasetType});
const insertRow = (record) => ({type: 'INSERT-ROW', record});
const updateRow = (index, record) => ({type: 'UPDATE-ROW', index, record});
const deleteRow = (index) => ({type: 'DELETE-ROW', index});
export const setupSort = (mode, force) => ({type: 'SETUP-SORT', mode, force});
export const doSort = () => ({type: 'DO-SORT'});
export const setupFilter = (stringToFind) => ({type: 'SETUP-FILTER', stringToFind});
export const doFilter = () => ({type: 'DO-FILTER'});
export const setCurrentPage = (numberOfPage) => ({type: 'SETUP-CURRENT-PAGE', numberOfPage});
export const switchPreloader = (mode) => ({type: 'PRELOADER-SWITCH', mode});

export const deleteRecord = (index) => ({type: 'DELETE-RECORD', index});

export const getDataset = (datasetType) => (dispatch) => {
    dispatch(switchPreloader(true));
    getData(datasetType).then(data => {
        if (data) {
            dispatch(insertTable(data, datasetType));
            dispatch(setupSort('id'));
            dispatch(doSort());
            dispatch(setupFilter(''));
            dispatch(doFilter());
        }
        dispatch(switchPreloader(false));
    })
};

export const applyInsert = (record) => (dispatch) => {
    dispatch(insertRow(record));
    dispatch(setupSort(null));
    dispatch(setupFilter(''));
    dispatch(doFilter());
};

export const applyUpdate = (index, record) => (dispatch) => {
    dispatch(updateRow(index, record));
    dispatch(setupSort(null));
    //dispatch(setupFilter(''));
    dispatch(doFilter());
};

export const applyDelete = (index) => (dispatch) => {
    dispatch(deleteRow(index));
    //dispatch(setupFilter(''));
    dispatch(doFilter());
}

export const applyFilter = (stringToFind) => (dispatch) => {
    dispatch(setupSort('id', true));
    dispatch(doSort());
    dispatch(setupFilter(stringToFind));
    dispatch(doFilter());
    dispatch(setCurrentPage(1));
}

export const applySort = (mode) => (dispatch) => {
    dispatch(setupSort(mode));
    dispatch(doSort());
    //dispatch(setupFilter(''));
    dispatch(doFilter());
    dispatch(setCurrentPage(1));
}


export const setUserCard = (recordData) => ({
    type: 'SET-USER-CARD',
    user: recordData
});
