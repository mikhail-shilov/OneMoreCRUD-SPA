import {getData} from "../api/api";

const initalState = {
    settings: {
        listColumnsOfTable: [
            {name: 'id', label: 'Id'},
            {name: 'firstName', label: 'Имя'},
            {name: 'lastName', label: 'Фамилия'},
            {name: 'eMail', label: 'Почта'},
            {name: 'telNo', label: 'Телефон'}
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
            localState.dataCache = action.data;
            return localState;
        }
        case 'INSERT-ROW-BY-FIRST': {
            let localState = {...state};
            localState.dataCache = [action.record, ...state.dataCache];
            return localState;
        }
        case 'SETUP-SORT': {
            //устанавливаются настройки фильтрации
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
            //выполняется фильтрация на основании настроек
            let localState = {...state};
            localState.settings = {...state.settings};
            localState.tableDataOutput = [...state.tableDataOutput];

            localState.tableDataOutput.sort((a, b) => {
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
        default: {
            return state;
        }
    }
};
export default tableReducer;

export const setupData = (data, datasetType) => ({type: 'SETUP-DATASET', data, datasetType});
export const insertRow = (id, firstName, lastName, email, phone) => ({
    type: 'INSERT-ROW-BY-FIRST',
    record: {id, firstName, lastName, email, phone}
});
export const setupSort = (mode, force) => ({type: 'SETUP-SORT', mode, force}); //remove ()!
export const doSort = () => ({type: 'DO-SORT'});
export const setupFilter = (stringToFind) => ({type: 'SETUP-FILTER', stringToFind});
export const doFilter = () => ({type: 'DO-FILTER'});
export const setCurrentPage = (numberOfPage) => ({type: 'SETUP-CURRENT-PAGE', numberOfPage});
export const switchPreloader = (mode) => ({type: 'PRELOADER-SWITCH', mode});

export const getDataset = (datasetType) => (dispatch) => {
    dispatch(switchPreloader(true));
    getData(datasetType).then(data => {
        if (data) {
            dispatch(setupData(data, datasetType));
            dispatch(setupFilter(''));
            dispatch(doFilter());

            dispatch(setupSort('id'));
            dispatch(doSort());

        }
        dispatch(switchPreloader(false));
    })
};
export const insertToDataset = (id, firstName, lastName, email, phone) => (dispatch) => {
    dispatch(insertRow(id, firstName, lastName, email, phone));
    dispatch(setupSort(null));
    dispatch(setFilter(''));
    dispatch(doFilter());

    //
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
    dispatch(setCurrentPage(1));
}


export const updateDraft = (value) => ({type: 'UPDATE-FILTER-DRAFT', value: value});
export const switchEditor = (mode) => ({type: 'EDITOR-SWITCH', mode});
export const setUserCard = (id, firstName, lastName, email, phone, description, address) => ({
    type: 'SET-USER-CARD',
    user: {id, firstName, lastName, email, phone, description, address}
});
export const updateEditor = (inputName, value) => ({
    type: 'EDITOR-UPDATE',
    inputName: inputName,
    value: value
});
