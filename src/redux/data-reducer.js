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
        findDraft: '',
        activeFilter: '',
        itemsPerPage: 10,
        currentPage: 1,
        isDataLoading: false,
        editorIsActive: false,
        itemInEditor: {
            indexOfItem: '',
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        }
    },
    tableDataIntetnal: [
        {id: 1, firstName: "Рулон", lastName: "Обоев", email: "rulon@test.io", phone: "2342342"},
        {id: 2, firstName: "Ушат", lastName: "Помоев", email: "ushat@test.io", phone: "2344672"},
        {id: 3, firstName: "Черёд", lastName: "Застоев", email: "chered@test.io", phone: "1354682"},
        {id: 4, firstName: "Налёт", lastName: "Ковбоев", email: "naljot@test.io", phone: "4337352"},
        {id: 5, firstName: "Набег", lastName: "Комрадов", email: "nabeg@test.io", phone: "7569331"},
        {id: 6, firstName: "Кумир", lastName: "Дебилов", email: "kumir@test.io", phone: "554833"},
        {id: 7, firstName: "Учёт", lastName: "Побоев", email: "uchot@test.io", phone: "644861"},
        {id: 8, firstName: "Поджог", lastName: "Сараев", email: "podjog@test.io", phone: "344866"}
    ],
    tableData: [
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
        case 'UPDATE-FIND-STRING': {
            let localState = {...state};
            localState.settings = {...state.settings};
            localState.settings.findDraft = action.value;
            return localState;
        }
        case 'FILTER': {
            let localState = {...state};
            localState.settings = {...state.settings};
            localState.tableDataOutput = {...state.tableDataOutput}

            const textToFind = String(localState.settings.findDraft);

            localState.tableDataOutput = state.tableData.filter(
                (item) => {
                    if (
                        (String(item.id).toLowerCase().includes(textToFind.toLowerCase())) ||
                        (item.firstName.toLowerCase().includes(textToFind.toLowerCase())) ||
                        (item.lastName.toLowerCase().includes(textToFind.toLowerCase()))
                    )
                        return 1;
                    else return 0;
                }
            );
            localState.settings.activeFilter = textToFind;
            localState.settings.findDraft = '';
            localState.settings.sortMode = 'id';
            localState.settings.sortDirection = 'asc';
            localState.settings.currentPage = 1;
            localState.tableDataOutput.sort((a, b) => {
                if (a.id < b.id) return (localState.settings.sortDirection === 'asc') ? -1 : 1;
                if (a.id > b.id) return (localState.settings.sortDirection === 'asc') ? 1 : -1;
                return 0;
            });
            return localState;
        }
        case 'LOAD-ITEM-TO-EDITOR': {
            let localState = {...state};
            localState.settings = {...state.settings};
            localState.settings.editorIsActive = true;
            localState.settings.itemInEditor = action.itemForEditor;
            return localState;
        }
        case 'UPDATE-ITEM-TO-EDITOR': {
            let localState = {...state};
            localState.settings = {...state.settings};
            localState.settings.itemInEditor = {...state.settings.itemInEditor};
            switch (action.inputName) {
                case 'firstName':
                    localState.settings.itemInEditor.firstName = action.value;
                    break
                case 'lastName':
                    localState.settings.itemInEditor.lastName = action.value;
                    break
                case 'eMail':
                    localState.settings.itemInEditor.email = action.value;
                    break
                case 'telNo':
                    localState.settings.itemInEditor.phone = action.value;
                    break
                default:
                    console.log('Incorrect inputName...');
                    break
            }
            return localState;
        }
        case 'SAVE-ITEM-FROM-EDITOR': {
            let localState = {...state};
            localState.settings = {...state.settings};
            localState.tableData = [...state.tableData];
            const indexForUpdate = localState.tableData.findIndex((element, index, array) => {
                return (element.id === action.id);
            });
            localState.tableData[indexForUpdate] = state.settings.itemInEditor;
            localState.tableDataOutput = localState.tableData;
            return localState;
        }
        case 'CLOSE-EDITOR': {
            let localState = {...state};
            localState.settings = {...state.settings};
            localState.settings.editorIsActive = false;
            localState.settings.itemInEditor = {
                indexOfItem: '',
                id: '',
                firstName: '',
                lastName: '',
                email: '',
                phone: ''
            }
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
export const loadItemToEditorAC = (id, firstName, lastName, eMail, telNo) => ({
    type: 'LOAD-ITEM-TO-EDITOR',
    itemForEditor: {id: id, firstName: firstName, lastName: lastName, email: eMail, phone: telNo}
});
export const updateItemToEditorAC = (inputName, value) => ({
    type: 'UPDATE-ITEM-TO-EDITOR',
    inputName: inputName,
    value: value
});
export const saveItemFromEditorAC = (id) => ({
    type: 'SAVE-ITEM-FROM-EDITOR',
    id: id,
});
export const closeEditorAC = () => ({type: 'CLOSE-EDITOR'});
