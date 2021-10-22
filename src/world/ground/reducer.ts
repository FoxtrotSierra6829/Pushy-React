const initialState = {
    ground: [],
}

const groundReducer = (state=initialState, action: any) => {
    switch(action.type) {
        case 'ADD_GROUND':
            return {
                ...action.payload
            }
        case 'UPDATE_GROUND':
            return {
                ...action.payload
            }
        default:
        return state
    }
}


export default groundReducer