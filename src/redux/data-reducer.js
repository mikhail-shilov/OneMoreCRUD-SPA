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
    filter: {
        draft: '',
        activeFilter: '',
    },
    userCard: null,
    isEditorActive: false,

    dataCache: [],
    tableDataOutput: []
};

const tableReducer = (state = initalState, action) => {
    switch (action.type) {
        case 'SETUP-DATASET': {
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
                    'streetAddress': record.address.streetAddress,
                    'city': record.address.city,
                    'province': record.address.state, //I think "state" is not best name in react+redux app.
                    'zip': record.address.zip,
                    'description': record.description,
                })
            });
            //service generate non unique ID's - add 'index' field to resolve this
            //not need address as isolated unit - transform record to flat, single level form
            return localState;
        }
        case 'UPDATE-ROW': {
            let localState = {...state};
            localState.dataCache = [...state.dataCache];
            let recordUpdate = action.record;

            let index = localState.dataCache.findIndex(record => (record.index === recordUpdate.index));

            localState.dataCache[index] = recordUpdate;

            return localState;
        }
        case 'INSERT-ROW': {
            let localState = {...state};
            let {
                index, id, firstName, lastName, email, phone,
                streetAddress, city, province, zip, description
            } = action.record;

            let indexData = localState.dataCache.map(record => record.index);
            indexData.sort((a, b) => {
                if (a > b) return -1;
                if (a == b) return 0;
                if (a < b) return 1;
            });
            index = Number(indexData[0] + 1); //readable variant
            id = id * 1; //short variant

            let record = {
                index, id, firstName, lastName, email, phone, description, streetAddress, city, province, zip
            }
            localState.dataCache = [record, ...state.dataCache];
            return localState;
        }
        case 'SETUP-SORT': {
            let localState = {...state};
            localState.settings = {...state.settings};
            if (action.force) localState.settings.sortDirection = 'asc';
            else {
                if (localState.settings.sortMode === action.mode) {
                    if (localState.settings.sortDirection === 'asc')
                        localState.settings.sortDirection = 'desc';
                    else
                        localState.settings.sortDirection = 'asc';
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
            localState.filter.activeFilter = action.stringToFind.toLowerCase();
            localState.filter.draft = '';//move it to local state
            return localState;
        }
        case 'DO-FILTER': {
            let localState = {...state};
            localState.settings = {...state.settings};
            const activeFilter = localState.filter.activeFilter;
            localState.tableDataOutput = state.dataCache.filter((item) => {
                    if (
                        (String(item.id).toLowerCase().includes(activeFilter)) ||
                        (item.firstName.toLowerCase().includes(activeFilter)) ||
                        (item.lastName.toLowerCase().includes(activeFilter))
                    ) return 1;
                    else return 0;
                }
            );
            return localState;
        }
        case 'UPDATE-FILTER-DRAFT': {
            //move functional to local state
            let localState = {...state};
            localState.filter = {...state.filter};
            localState.filter.draft = action.value;
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
        case 'EDITOR-SWITCH': {
            let localState = {...state};
            localState.isEditorActive = action.mode;
            return localState;
        }
        case 'EDITOR-UPDATE': {
            let localState = {...state};
            localState.editor = {...state.editor};
            localState.editor.user = {...state.editor.user};
            switch (action.inputName) {
                case 'id':
                    localState.editor.user.id = action.value * 1;
                    break
                case 'firstName':
                    localState.editor.user.firstName = action.value;
                    break
                case 'lastName':
                    localState.editor.user.lastName = action.value;
                    break
                case 'email':
                    localState.editor.user.email = action.value;
                    break
                case 'phone':
                    localState.editor.user.phone = action.value;
                    break
                default:
                    console.log('Incorrect inputName...');
                    break
            }
            return localState;
        }
        case 'DELETE-RECORD': {
            //deleted record from loadFromNetwork cache
            let localState = {...state};
            localState.dataCache = state.dataCache.filter(record => {
                if (record.index === action.index) return false
                else return true
            });
            return localState;
        }
        default: {
            return state;
        }
    }
};
export default tableReducer;

export const setupData = (data, datasetType) => ({type: 'SETUP-DATASET', data, datasetType});
export const insertRow = (record) => ({type: 'INSERT-ROW', record});
export const updateRow = (record) => ({type: 'UPDATE-ROW', record});
export const setupSort = (mode, force) => ({type: 'SETUP-SORT', mode, force});
export const doSort = () => ({type: 'DO-SORT'});
export const setupFilter = (stringToFind) => ({type: 'SETUP-FILTER', stringToFind});
export const doFilter = () => ({type: 'DO-FILTER'});
export const setCurrentPage = (numberOfPage) => ({type: 'SETUP-CURRENT-PAGE', numberOfPage});
export const switchPreloader = (mode) => ({type: 'PRELOADER-SWITCH', mode});
export const deleteRecord = (index) => ({type: 'DELETE-RECORD', index});

export const getDataset = (datasetType) => (dispatch) => {
    dispatch(switchPreloader(true));
    if (datasetType === 'INTERNAL') {
        const data = [
            {id: 1, firstName: "Рулон", lastName: "Обоев", email: "rulon@test.io", phone: "2342342"},
            {id: 2, firstName: "Ушат", lastName: "Помоев", email: "ushat@test.io", phone: "2344672"},
            {id: 3, firstName: "Черёд", lastName: "Застоев", email: "chered@test.io", phone: "1354682"},
            {id: 4, firstName: "Налёт", lastName: "Ковбоев", email: "naljot@test.io", phone: "4337352"},
            {id: 5, firstName: "Набег", lastName: "Комрадов", email: "nabeg@test.io", phone: "7569331"},
            {id: 6, firstName: "Кумир", lastName: "Дебилов", email: "kumir@test.io", phone: "554833"},
            {id: 7, firstName: "Учёт", lastName: "Побоев", email: "uchot@test.io", phone: "644861"},
            {id: 8, firstName: "Поджог", lastName: "Сараев", email: "podjog@test.io", phone: "344866"}
        ];
        dispatch(setupData(data, datasetType));
        dispatch(setupFilter(''));
        dispatch(doFilter());
        dispatch(setupSort('id'));
        dispatch(doSort());
    } else {
        getData(datasetType).then(data => {
            if (data) {
                dispatch(setupData(data, datasetType));
                dispatch(setupSort('id'));
                dispatch(doSort());
                dispatch(setupFilter(''));
                dispatch(doFilter());
            }
            dispatch(switchPreloader(false));
        })
    }
};

/*
export const insertToDataset = (id, firstName, lastName, email, phone) => (dispatch) => {
    dispatch(insertRow(id, firstName, lastName, email, phone));
    dispatch(setupSort(null));
    dispatch(setFilter(''));
    dispatch(doFilter());
    dispatch(setCurrentPage(1));

};
*/

export const insertToDataset = (record) => (dispatch) => {
    dispatch(insertRow(record));
    dispatch(setupSort(null));
    dispatch(setupFilter(''));
    dispatch(doFilter());
    dispatch(setCurrentPage(1));
};
export const updateDataset = (record) => (dispatch) => {
    dispatch(updateRow(record));
    //dispatch(setupSort(null));
    dispatch(setupFilter(''));
    dispatch(doFilter());
};

export const setFilter = (stringToFind) => (dispatch) => {
    dispatch(setupFilter(stringToFind));
    dispatch(doFilter());
    dispatch(setCurrentPage(1));
    dispatch(setupSort('id', true));
    dispatch(doSort());
}
export const applySort = (mode) => (dispatch) => {
    dispatch(setupSort(mode));
    dispatch(doSort());
    dispatch(setupFilter(''));
    dispatch(doFilter());
    dispatch(setCurrentPage(1));
}

export const applyDelete = (index) => (dispatch) => {
    dispatch(deleteRecord(index));
    dispatch(setupFilter(''));
    dispatch(doFilter());
    //dispatch(doSort());


}

export const updateDraft = (value) => ({type: 'UPDATE-FILTER-DRAFT', value: value});
export const switchEditor = (mode) => ({type: 'EDITOR-SWITCH', mode});
export const setUserCard = (recordData) => ({
    type: 'SET-USER-CARD',
    user: recordData
});
export const updateEditor = (inputName, value) => ({
    type: 'EDITOR-UPDATE',
    inputName: inputName,
    value: value
});
