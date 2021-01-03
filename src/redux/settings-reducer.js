const initalState = {
        isSettingsActive: false,
        itemsPerPage: 20,
};

const tableReducer = (state = initalState, action) => {
    switch (action.type) {
        case 'SET-ITEMS-PER-PAGE': {
            return {...state, itemsPerPage: action.itemsPerPage};
        }
        default: {
            return state;
        }
    }
};
export default tableReducer;

export const setItemsPerPage = (itemsPerPage) => ({type: 'SET-ITEMS-PER-PAGE', itemsPerPage});
