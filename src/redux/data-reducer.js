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
        sortMode: 'id',
        sortDirection: 'asc',
        itemsPerPage: 10,
        currentPage: 1,
        isFetching: false, //происходит ли загрузка чего либо
        datasetType: null, //Большой или малый набор данных загружен. При запуске - null.
    },
    dataCache: [
        {id: 1, firstName: "Рулон", lastName: "Обоев", email: "rulon@test.io", phone: "2342342"},
        {id: 2, firstName: "Ушат", lastName: "Помоев", email: "ushat@test.io", phone: "2344672"},
        {id: 3, firstName: "Черёд", lastName: "Застоев", email: "chered@test.io", phone: "1354682"},
        {id: 4, firstName: "Налёт", lastName: "Ковбоев", email: "naljot@test.io", phone: "4337352"},
        {id: 5, firstName: "Набег", lastName: "Комрадов", email: "nabeg@test.io", phone: "7569331"},
        {id: 6, firstName: "Кумир", lastName: "Дебилов", email: "kumir@test.io", phone: "554833"},
        {id: 7, firstName: "Учёт", lastName: "Побоев", email: "uchot@test.io", phone: "644861"},
        {id: 8, firstName: "Поджог", lastName: "Сараев", email: "podjog@test.io", phone: "344866"}
    ],
    tableDataOutput: []
};

const tableReducer = (state = initalState, action) => {
    switch (action.type) {
        case 'SET-DATA': {
            let localState = {...state};
            localState.settings = {...state.settings};
            localState.settings.datasetType = action.datasetType;
            localState.dataCache = action.data;
            localState.tableDataOutput = action.data;
            return localState;
        }
        case 'SORT': {
            let localState = {...state};
            localState.settings = {...state.settings};
            localState.tableDataOutput = [...state.tableDataOutput];

            if (localState.settings.sortMode === action.mode)
                if (localState.settings.sortDirection === 'asc')
                    localState.settings.sortDirection = 'desc';
                else
                    localState.settings.sortDirection = 'asc';
            else
                localState.settings.sortDirection = 'asc';

            localState.settings.sortMode = action.mode;

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
        case 'FILTER': {
            let localState = {...state};
            localState.settings = {...state.settings};

            const textToFind = action.stringToFind.toLowerCase();

            localState.tableDataOutput = state.dataCache.filter(
                (item) => {
                    if (
                        (String(item.id).toLowerCase().includes(textToFind)) ||
                        (item.firstName.toLowerCase().includes(textToFind)) ||
                        (item.lastName.toLowerCase().includes(textToFind))
                    ) return 1;
                    else return 0;
                }
            );
            localState.settings.activeFilter = textToFind;
            localState.settings.findDraft = '';
            return localState;
        }






        case 'SET-CURRENT-PAGE': {
            let localState = {...state};
            localState.settings = {...state.settings};
            localState.settings.currentPage = action.currentPage;
            return localState;
        }
        case 'LOADING-INDICATOR-SWITCH': {
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

export const setData = (data, datasetType) => ({type: 'SET-DATA', data, datasetType});
export const setFilter = (stringToFind) => ({type: 'FILTER', stringToFind});

export const switchIndicator = (mode) => ({type: 'LOADING-INDICATOR-SWITCH', mode});
export const setCurrentPage = (currentPage) => ({type: 'SET-CURRENT-PAGE', currentPage: currentPage});

export const getDataset = (datasetType) => (dispatch) => {
    dispatch(switchIndicator(true));
    getData(datasetType).then(data => {
        dispatch(setData(data, datasetType));
        dispatch(setFilter(''));

        dispatch(switchIndicator(false));
    })
}