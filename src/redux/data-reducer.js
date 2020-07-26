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
        isDataLoading: false, //происходит ли загрузка чего либо
        dataSet: null, //Большой или малый набор данных загружен. При запуске - null.
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
        case 'LOAD-DATA': {
            let localState = {...state};
            localState.settings = {...state.settings};

            //В action передаётся либо 'internal' либо объект с данными
            if (action.data === 'internal') localState.tableData = [...state.tableDataIntetnal]
            else localState.tableData = action.data;
            localState.settings.currentPage = 1;
            localState.tableDataOutput = localState.tableData;
            localState.tableDataOutput.sort((a, b) => {
                if (a.id < b.id) return (localState.settings.sortDirection === 'asc') ? -1 : 1;
                if (a.id > b.id) return (localState.settings.sortDirection === 'asc') ? 1 : -1;
                return 0;
            });
            return localState;
        }
        case 'RESORT': {
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
            localState.settings.currentPage = 1;
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
            (localState.settings.isDataLoading === true) ? localState.settings.isDataLoading = false : localState.settings.isDataLoading = true;
            console.log(localState.settings.isDataLoading);
            return localState;
        }
        default: {
            return state;
        }
    }
};
export default tableReducer;

export const loadAC = (data) => ({type: 'LOAD-DATA', data: data});
export const switchIndicator = () => ({type: 'LOADING-INDICATOR-SWITCH'});
export const setSortModeAC = (mode) => ({type: 'RESORT', mode: mode});
export const dataFilterAC = () => ({type: 'FILTER'});
export const updateFindStringAC = (value) => ({type: 'UPDATE-FIND-STRING', value: value});
export const setCurrentPageAC = (currentPage) => ({type: 'SET-CURRENT-PAGE', currentPage: currentPage});

