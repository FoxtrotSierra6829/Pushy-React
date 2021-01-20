const initialState = {
    levelname: ""
}

const levelnameReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'ADD_LEVELNAME':
            return {
                ...action.payload
            }
        default:
        return state
    }
}


export default levelnameReducer